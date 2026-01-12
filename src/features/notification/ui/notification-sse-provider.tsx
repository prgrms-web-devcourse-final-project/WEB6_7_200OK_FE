"use client";

import { useEffect, useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { notificationKeys } from "@/features/notification/api/use-notifications";
import type { NotificationItem } from "@/features/notification/model/types";
import { useUserBasic } from "@/features/user/api/use-user-basic";
import type { SliceResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

const PROXY_BASE_URL = "/api/proxy";
const SSE_EVENT_TYPES = [
  "priceAlert",
  "auctionStartAlert",
  "auctionFailedSeller",
  "auctionFailedSubscriber",
  "auctionSuccessSeller",
  "auctionSuccessSubscriber",
  "reviewRegistered",
  "chatMessage",
] as const;
const MAX_RECONNECT_DELAY_MS = 30_000;
const RECONNECT_BASE_DELAY_MS = 1_000;

type NotificationPayload = Partial<NotificationItem> & Record<string, unknown>;

function parseNotificationPayload(rawData: string): NotificationPayload | null {
  try {
    return JSON.parse(rawData) as NotificationPayload;
  } catch {
    return null;
  }
}

function getPayloadId(payload: NotificationPayload | null): string | null {
  if (!payload) return null;
  const candidate = payload.notificationId ?? payload.id;
  if (typeof candidate === "number" || typeof candidate === "string") {
    return String(candidate);
  }
  return null;
}

function getPayloadTitle(payload: NotificationPayload | null): string | null {
  if (!payload) return null;
  const candidate = payload.title;
  return typeof candidate === "string" && candidate.length > 0 ? candidate : null;
}

function prependNotification(
  queryClient: ReturnType<typeof useQueryClient>,
  payload: NotificationPayload
) {
  const payloadId = getPayloadId(payload);
  if (!payloadId) return false;
  let didPrepend = false;

  queryClient.setQueriesData<SliceResponseType<NotificationItem>>(
    { queryKey: notificationKeys.all },
    (data) => {
      if (!data) return data;
      const exists = data.slice.some((item) => String(item.notificationId) === payloadId);
      if (exists) return data;
      didPrepend = true;

      const mergedSlice = [payload as NotificationItem, ...data.slice];
      const trimmedSlice = data.size ? mergedSlice.slice(0, data.size) : mergedSlice;

      return {
        ...data,
        slice: trimmedSlice,
      };
    }
  );

  return didPrepend;
}

export function NotificationSseProvider() {
  const { data: user } = useUserBasic();
  const queryClient = useQueryClient();
  const sourceRef = useRef<EventSource | null>(null);
  const isConnectingRef = useRef(false);
  const reconnectAttemptRef = useRef(0);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasNotifiedErrorRef = useRef(false);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const url = `${PROXY_BASE_URL}${API_ENDPOINTS.notificationsSubscribe}`;

    const clearRetryTimeout = () => {
      if (!retryTimeoutRef.current) return;
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    };

    const closeSource = () => {
      if (!sourceRef.current) return;
      sourceRef.current.close();
      sourceRef.current = null;
      isConnectingRef.current = false;
      clearRetryTimeout();
    };

    if (!isAuthenticated) {
      closeSource();
      return;
    }

    const handleSseEvent = (rawData: string) => {
      const payload = parseNotificationPayload(rawData);

      if (payload) {
        const didPrepend = prependNotification(queryClient, payload);

        const title = getPayloadTitle(payload);
        showToast.info(title ?? "새 알림이 도착했어요.");

        if (!didPrepend) {
          queryClient.invalidateQueries({ queryKey: notificationKeys.all });
        }
      }
    };

    const scheduleReconnect = () => {
      if (!isAuthenticated) return;
      if (retryTimeoutRef.current) return;

      const attempt = reconnectAttemptRef.current;
      const delay = Math.min(RECONNECT_BASE_DELAY_MS * 2 ** attempt, MAX_RECONNECT_DELAY_MS);
      reconnectAttemptRef.current += 1;

      retryTimeoutRef.current = setTimeout(() => {
        retryTimeoutRef.current = null;
        connect();
      }, delay);
    };

    const connect = () => {
      if (!isAuthenticated) return;
      if (sourceRef.current || isConnectingRef.current) return;

      isConnectingRef.current = true;
      const source = new EventSource(url, { withCredentials: true });
      sourceRef.current = source;

      source.onopen = () => {
        isConnectingRef.current = false;
        reconnectAttemptRef.current = 0;
        hasNotifiedErrorRef.current = false;
      };

      source.onmessage = (event) => {
        handleSseEvent(event.data);
      };

      source.onerror = () => {
        isConnectingRef.current = false;
        if (sourceRef.current) {
          sourceRef.current.close();
          sourceRef.current = null;
        }
        if (!hasNotifiedErrorRef.current) {
          showToast.warning("실시간 알림 연결이 불안정합니다.");
          hasNotifiedErrorRef.current = true;
        }
        scheduleReconnect();
      };

      SSE_EVENT_TYPES.forEach((eventName) => {
        source.addEventListener(eventName, (event) => {
          handleSseEvent(event.data);
        });
      });
    };

    clearRetryTimeout();
    connect();

    return () => {
      closeSource();
    };
  }, [isAuthenticated, queryClient]);

  return null;
}
