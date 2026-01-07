"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UserPurchaseItemType, UserPurchaseStatusType } from "@/entities/auction";
import { httpClient } from "@/shared/api/client";
import type { SliceResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface PurchaseSliceItem {
  status: "PURCHASE_CONFIRMED" | "PAYMENT_COMPLETED";
  auctionId: number;
  tradeId: number;
  title: string;
  auctionImageUrl: string;
  startPrice: number;
  endPrice: number;
  discountPercent: number;
  purchasedDate: string;
  reviewId?: number;
  chatInfo?: { roomId: number; unreadCount: number };
  sellerId: number;
  sellername: string;
  sellerProfileImage?: string;
}

interface PurchaseData {
  slice: PurchaseSliceItem[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}

const mapPurchaseStatus = (status: PurchaseSliceItem["status"]): UserPurchaseStatusType =>
  status === "PURCHASE_CONFIRMED" ? "구매 확정" : "구매 완료";

const fetchPurchaseList = async (
  pageParam: number
): Promise<SliceResponseType<UserPurchaseItemType>> => {
  const res = await httpClient<PurchaseData>(
    `${API_ENDPOINTS.myPurchases}?page=${pageParam}&size=5`,
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

  const mappedSlice = data.slice.map((item) => ({
    id: item.auctionId,
    name: item.title,
    imageUrl: item.auctionImageUrl,
    price: item.endPrice,
    originalPrice: item.startPrice,
    discountRate: item.discountPercent,
    status: mapPurchaseStatus(item.status),
    date: item.purchasedDate,
    hasReview: !!item.reviewId,
    unreadMessageCount: item.chatInfo?.unreadCount ?? 0,
    chatRoomId: item.chatInfo?.roomId ?? 0,
    tradeId: item.tradeId,
    reviewId: item.reviewId,
    sellerId: item.sellerId,
    sellername: item.sellername,
    sellerProfileImage: item.sellerProfileImage,
  }));

  return {
    ...data,
    slice: mappedSlice,
  };
};

const confirmPurchase = async (tradeId: number) => {
  await httpClient(API_ENDPOINTS.purchaseConfirm(tradeId), {
    method: "PATCH",
  });
};

export const purchaseKeys = {
  all: ["user", "purchases"] as const,
};

export function usePurchases() {
  return useInfiniteQuery({
    queryKey: purchaseKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchPurchaseList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePurchaseConfirm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
    },
  });
}
