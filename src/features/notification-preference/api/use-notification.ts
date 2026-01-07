import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { UserTradeStatusType } from "@/entities/auction";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import {
  getAuctionsCacheSnapshot,
  restoreAuctionsCache,
  updateAuctionsCache,
} from "@/shared/lib/query/update-auctions-cache";

import type { NotificationPreferenceItemType } from "../model/types";

interface NotificationInfo {
  alertStart: boolean;
  alertEnd: boolean;
  alertPrice: boolean;
  triggerPrice: number;
}

interface NotificationSliceItem {
  status: string;
  auctionId: number;
  title: string;
  auctionImageUrl: string;
  startPrice: number;
  startedAt: string;
  notificationInfo: NotificationInfo;
  currentPrice?: number;
  endPrice?: number;
  discountPercent?: number;
}

interface NotificationData {
  slice: NotificationSliceItem[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}

interface NotificationSettingResponse {
  auctionStart: boolean;
  auctionEnd: boolean;
  priceReached: boolean;
  price: number;
}

interface UpdateNotificationRequest {
  auctionStart: boolean;
  auctionEnd: boolean;
  priceReached: boolean;
  price: number;
}

export const notificationKeys = {
  all: ["user", "notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
  settings: (auctionId: number) => [...notificationKeys.all, "settings", auctionId] as const,
};

const mapStatusToTradeStatus = (status: string): UserTradeStatusType => {
  switch (status) {
    case "SCHEDULED":
      return "경매 예정";
    case "PROCESS":
      return "판매중";
    case "COMPLETED":
      return "판매 완료";
    case "FAILED":
    case "CANCELED":
    default:
      return "경매 종료";
  }
};

const generateKeywords = (info: NotificationInfo): string[] => {
  const keywords: string[] = [];
  if (info.alertStart) keywords.push("경매 시작");
  if (info.alertPrice && info.triggerPrice > 0)
    keywords.push(`${info.triggerPrice.toLocaleString()}원 도달`);
  if (info.alertEnd) keywords.push("경매 종료");
  return keywords;
};

const fetchNotifications = async (): Promise<NotificationPreferenceItemType[]> => {
  const response = await httpClient<NotificationData>(API_ENDPOINTS.myNotifications, {
    method: "GET",
  });
  const slice = response.data?.slice ?? [];

  return slice
    .filter((item): item is NotificationSliceItem => item != null)
    .map((item) => {
      const finalPrice = item.endPrice || item.currentPrice || item.startPrice;

      return {
        id: String(item.auctionId),
        status: mapStatusToTradeStatus(item.status),
        name: item.title,
        price: finalPrice,
        originalPrice: item.startPrice,
        discountRate: item.discountPercent,
        date: item.startedAt,
        imageUrl: item.auctionImageUrl,
        keywords: generateKeywords(item.notificationInfo),
      };
    });
};

const fetchNotificationSettings = async (
  auctionId: number
): Promise<NotificationSettingResponse> => {
  const response = await httpClient<NotificationSettingResponse>(
    API_ENDPOINTS.auctionNotificationSetting(auctionId),
    { method: "GET" }
  );
  return response.data;
};

export function useNotificationList() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: fetchNotifications,
  });
}

export function useNotificationSettings(auctionId: number) {
  return useQuery({
    queryKey: notificationKeys.settings(auctionId),
    queryFn: () => fetchNotificationSettings(auctionId),
    enabled: !!auctionId,
  });
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ auctionId, data }: { auctionId: number; data: UpdateNotificationRequest }) =>
      httpClient(API_ENDPOINTS.auctionNotificationSetting(auctionId), {
        method: "PUT",
        body: data,
      }),
    onMutate: ({ auctionId, data }) => {
      const snapshot = getAuctionsCacheSnapshot(queryClient);
      const isNotification = data.auctionStart || data.auctionEnd || data.priceReached;
      updateAuctionsCache(queryClient, auctionId, { isNotification });
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      restoreAuctionsCache(queryClient, ctx?.snapshot);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.settings(vars.auctionId) });
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}
