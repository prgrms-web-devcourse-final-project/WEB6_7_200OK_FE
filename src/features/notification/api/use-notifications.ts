"use client";

import { useQuery } from "@tanstack/react-query";

import { httpClient } from "@/shared/api/client";
import type { SliceResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

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
