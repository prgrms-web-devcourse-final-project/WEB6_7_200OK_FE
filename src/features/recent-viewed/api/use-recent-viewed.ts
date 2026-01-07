"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UserRecentlyViewedItemType, UserTradeStatusType } from "@/entities/auction";
import { httpClient } from "@/shared/api/client";
import type { SliceResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { dayjs } from "@/shared/lib/utils/dayjs";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

export const userRecentViewedKeys = {
  all: ["user", "recent-viewed"] as const,
};

interface RecentViewedSliceItem {
  status: "PROCESS" | "SCHEDULED" | "FAILED" | "CANCELED" | "COMPLETED" | string;
  recentViewId: number;
  auctionId: number;
  title: string;
  auctionImageUrl?: string | null;
  startPrice: number;
  currentPrice?: number | null;
  endPrice?: number | null;
  discountPercent?: number | null;
  startedAt: string;
  tradeStatus?: string | null;
}

interface RecentViewedData {
  slice: RecentViewedSliceItem[];
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
    case "FAILED":
    case "CANCELED":
    default:
      return "경매 종료";
  }
};

const deleteRecentViewItem = async (recentViewId: number) => {
  await httpClient(API_ENDPOINTS.deleteRecentView(recentViewId), {
    method: "DELETE",
  });
};

const fetchRecentViewedItems = async (
  pageParam: number
): Promise<SliceResponseType<UserRecentlyViewedItemType & { recentViewId: number }>> => {
  const res = await httpClient<RecentViewedData>(
    `${API_ENDPOINTS.myRecentViews}?page=${pageParam}&size=5`,
    { method: "GET" }
  );

  const { data } = res;

  if (!data) {
    return {
      slice: [],
      hasNext: false,
      page: pageParam,
      size: 10,
      timeStamp: "",
    };
  }

  const mappedSlice = data.slice
    .filter((item): item is RecentViewedSliceItem => item != null)
    .map((item) => {
      const price = item.endPrice ?? item.currentPrice ?? item.startPrice ?? 0;
      const hasCurrentPrice = item.endPrice != null || item.currentPrice != null;

      return {
        id: item.auctionId,
        recentViewId: item.recentViewId,
        name: item.title,
        imageUrl: item.auctionImageUrl ?? undefined,
        price,
        originalPrice: item.startPrice,
        discountRate: hasCurrentPrice ? (item.discountPercent ?? undefined) : undefined,
        status: mapStatusToTradeStatus(item.status),
        date: dayjs(item.startedAt).format("YYYY-MM-DD"),
      };
    });

  return {
    ...data,
    slice: mappedSlice,
  };
};

export function useRecentViewedItems() {
  return useInfiniteQuery({
    queryKey: userRecentViewedKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchRecentViewedItems(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDeleteRecentView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecentViewItem,
    onSuccess: () => {
      showToast.success("최근 본 상품에서 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: userRecentViewedKeys.all });
    },
    onError: () => {
      showToast.error("최근 본 상품 삭제에 실패했습니다.");
    },
  });
}
