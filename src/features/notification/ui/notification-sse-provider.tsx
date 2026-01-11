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
] as const;

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
  if (!payloadId) return;

  queryClient.setQueriesData<SliceResponseType<NotificationItem>>(
    { queryKey: notificationKeys.all },
    (data) => {
      if (!data) return data;
      const exists = data.slice.some((item) => String(item.notificationId) === payloadId);
      if (exists) return data;

      const mergedSlice = [payload as NotificationItem, ...data.slice];
      const trimmedSlice = data.size ? mergedSlice.slice(0, data.size) : mergedSlice;

      return {
        ...data,
        slice: trimmedSlice,
      };
    }
  );
}

export function NotificationSseProvider() {
  const { data: user } = useUserBasic();
  const queryClient = useQueryClient();
  const sourceRef = useRef<EventSource | null>(null);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const url = `${PROXY_BASE_URL}${API_ENDPOINTS.notificationsSubscribe}`;

    const closeSource = () => {
      if (!sourceRef.current) return;
      sourceRef.current.close();
      sourceRef.current = null;
    };

    if (!isAuthenticated) {
      closeSource();
      return;
    }

    if (sourceRef.current) {
      return;
    }

    const source = new EventSource(url);
    sourceRef.current = source;

    const handleSseEvent = (rawData: string) => {
      const payload = parseNotificationPayload(rawData);

      if (payload) {
        prependNotification(queryClient, payload);

        const title = getPayloadTitle(payload);
        showToast.info(title ?? "새 알림이 도착했어요.");

        queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      }
    };

    source.onmessage = (event) => {
      handleSseEvent(event.data);
    };

    SSE_EVENT_TYPES.forEach((eventName) => {
      source.addEventListener(eventName, (event) => {
        handleSseEvent(event.data);
      });
    });

    return () => {
      closeSource();
    };
  }, [isAuthenticated, queryClient]);

  return null;
}
