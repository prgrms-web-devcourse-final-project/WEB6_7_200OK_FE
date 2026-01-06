"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { UserPurchaseItemType, UserPurchaseStatusType } from "@/entities/auction";
import { httpClient } from "@/shared/api/client";
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

const fetchPurchaseList = async (): Promise<UserPurchaseItemType[]> => {
  const res = await httpClient<PurchaseData>(API_ENDPOINTS.myPurchases, { method: "GET" });
  const slice = res.data?.slice ?? [];

  return slice.map((item) => ({
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
  return useQuery({
    queryKey: purchaseKeys.all,
    queryFn: fetchPurchaseList,
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
