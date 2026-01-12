"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { httpClient } from "@/shared/api/client";
import type { SliceResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

import type { NotificationItem } from "../model/types";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 15;

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (page: number, size: number) => [...notificationKeys.all, "list", page, size] as const,
};

const fetchNotifications = async (
  page: number,
  size: number
): Promise<SliceResponseType<NotificationItem>> => {
  const response = await httpClient<SliceResponseType<NotificationItem>>(
    API_ENDPOINTS.notifications,
    {
      method: "GET",
      queryParams: { page, size },
    }
  );

  if (!response.data) {
    return {
      slice: [],
      hasNext: false,
      page,
      size,
      timeStamp: "",
    };
  }

  return response.data;
};

export function useNotifications({ page = DEFAULT_PAGE, size = DEFAULT_SIZE } = {}) {
  return useQuery({
    queryKey: notificationKeys.list(page, size),
    queryFn: () => fetchNotifications(page, size),
  });
}

const readNotification = async (notificationId: number) => {
  const response = await httpClient<null>(API_ENDPOINTS.notificationsRead(notificationId), {
    method: "PATCH",
  });

  return response.data;
};

const readAllNotifications = async () => {
  const response = await httpClient<null>(API_ENDPOINTS.notificationsReadAll, {
    method: "PATCH",
  });

  return response.data;
};

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: () => {
      showToast.error("알림 읽음 처리에 실패했습니다. 다시 시도해주세요.");
    },
  });
}

export function useReadAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: () => {
      showToast.error("알림 전체 읽음 처리에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
