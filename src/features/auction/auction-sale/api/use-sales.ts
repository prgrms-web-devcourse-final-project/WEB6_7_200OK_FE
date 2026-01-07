import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";

import type { UserSellingItemType, UserTradeStatusType } from "@/entities/auction";
import { httpClient } from "@/shared/api/client";
import type { SliceResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

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
  chatInfo?: { roomId: number; unreadCount: number };
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

const getUserSalesList = async (
  userId: number,
  pageParam: number
): Promise<SliceResponseType<UserSellingItemType>> => {
  const response = await httpClient<SalesData>(
    `${API_ENDPOINTS.userSales(userId)}?page=${pageParam}&size=5`,
    { method: "GET" }
  );

  const { data } = response;

  if (!data) {
    return {
      slice: [],
      hasNext: false,
      page: pageParam,
      size: 10,
      timeStamp: "",
    } as SliceResponseType<UserSellingItemType>;
  }

  const mappedSlice = data.slice
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
        chatRoomId: item.chatInfo?.roomId,
        unreadMessageCount: item.chatInfo?.unreadCount,
      };
    });

  return {
    ...data,
    slice: mappedSlice,
  };
};

const cancelAuction = async (auctionId: number) => {
  await httpClient<void>(API_ENDPOINTS.auctionDetail(auctionId), { method: "PATCH" });
};

export const userSaleKeys = {
  all: ["user", "sales"] as const,
  list: (userId: number) => [...userSaleKeys.all, userId] as const,
};

export function useUserSalesList(userId: number) {
  return useInfiniteQuery({
    queryKey: userSaleKeys.list(userId),
    queryFn: ({ pageParam = 0 }) => getUserSalesList(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    enabled: !!userId && userId > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCancelSale(userId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAuction,
    onSuccess: async () => {
      if (userId) {
        await queryClient.invalidateQueries({
          queryKey: userSaleKeys.list(userId),
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: userSaleKeys.all,
        });
      }
      showToast.success("경매가 종료되었습니다.");
    },
    onError: () => {
      showToast.error("경매 종료가 실패했습니다.");
    },
  });
}
