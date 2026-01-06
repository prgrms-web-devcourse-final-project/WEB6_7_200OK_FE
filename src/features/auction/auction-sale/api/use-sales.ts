import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { UserSellingItemType, UserTradeStatusType } from "@/entities/auction";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface SalesSliceItem {
  status: "PROCESS" | "SCHEDULED" | "FAILED" | "CANCELED" | "COMPLETED" | string;
  auctionId: number;
  title: string;
  auctionImageUrl: string;
  startPrice: number;
  currentPrice?: number;
  endPrice?: number;
  discountPercent?: number;
  startedAt: string;
  chatRoomId?: number;
  unreadCount?: number;
}

interface SalesData {
  slice: SalesSliceItem[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}

const mapStatusToTradeStatus = (status: string): UserTradeStatusType => {
  switch (status) {
    case "SCHEDULED":
      return "경매 예정";
    case "PROCESS":
      return "판매중";
    case "COMPLETED":
      return "판매 완료";
    default:
      return "경매 종료";
  }
};

const fetchSalesList = async (userId: number): Promise<UserSellingItemType[]> => {
  const response = await httpClient<SalesData>(API_ENDPOINTS.userSales(userId), { method: "GET" });

  const slice = response.data?.slice ?? [];

  return slice
    .filter((item): item is SalesSliceItem => item !== null)
    .map((item) => {
      const price =
        item.status === "COMPLETED"
          ? (item.endPrice ?? item.currentPrice ?? item.startPrice)
          : (item.currentPrice ?? item.startPrice);

      return {
        id: item.auctionId,
        name: item.title,
        imageUrl: item.auctionImageUrl,
        price,
        originalPrice: item.startPrice,
        discountRate: item.discountPercent ?? 0,
        status: mapStatusToTradeStatus(item.status),
        date: dayjs(item.startedAt).format("YYYY-MM-DD"),
        chatRoomId: item.chatRoomId ?? 0,
        unreadMessageCount: item.unreadCount ?? 0,
      };
    });
};

export const saleKeys = {
  all: ["user", "sales"] as const,
  list: (userId: number) => [...saleKeys.all, userId] as const,
};

export function useSales(userId: number) {
  return useQuery({
    queryKey: saleKeys.list(userId),
    queryFn: () => fetchSalesList(userId),
    enabled: !!userId && userId > 0,
    staleTime: 1000 * 60 * 5,
  });
}
