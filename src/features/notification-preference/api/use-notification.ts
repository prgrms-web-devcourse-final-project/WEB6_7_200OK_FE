import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UserTradeStatusType } from "@/entities/auction";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

import { NotificationPreferenceItemType } from "../model/types";

// 1. DTO & Interfaces
interface NotificationInfo {
  alertStart: boolean;
  alertEnd: boolean;
  alertPrice: boolean;
  triggerPrice: number;
}

interface NotificationSliceItem {
  status: string; // "PROCESS" | "SCHEDULED" ...
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

// 개별 설정 조회 응답 타입
interface NotificationSettingResponse {
  auctionStart: boolean;
  auctionEnd: boolean;
  priceReached: boolean;
  price: number;
}

// 설정 수정 Request 타입
interface UpdateNotificationRequest {
  auctionStart: boolean;
  auctionEnd: boolean;
  priceReached: boolean;
  price: number;
}

// 2. Query Keys (Factory Pattern)
export const notificationKeys = {
  all: ["user", "notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
  settings: (auctionId: number) => [...notificationKeys.all, "settings", auctionId] as const,
};

// 3. Helper Functions
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

// 4. API Fetchers
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
    API_ENDPOINTS.notificationSettings(auctionId),
    { method: "GET" }
  );
  // httpClient가 감싸고 있는 응답 구조에 따라 response.data 반환
  // 만약 httpClient가 data 필드를 바로 반환하면 return response;
  return response.data;
};

// 5. Custom Hooks
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
      httpClient(API_ENDPOINTS.notificationSettings(auctionId), {
        method: "PUT",
        body: data, // JSON.stringify 제거 (httpClient 내부 처리 가정)
      }),
    onSuccess: (_, vars) => {
      // 해당 경매의 설정값 갱신
      queryClient.invalidateQueries({ queryKey: notificationKeys.settings(vars.auctionId) });
      // 알림 목록의 키워드 정보도 바뀔 수 있으므로 목록 갱신
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}
