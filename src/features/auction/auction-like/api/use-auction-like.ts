import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UserAuctionLikeItemType, UserTradeStatusType } from "@/entities/auction";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import {
  getAuctionsCacheSnapshot,
  restoreAuctionsCache,
  updateAuctionsCache,
} from "@/shared/lib/query/update-auctions-cache";

interface LikeSliceItem {
  status: "PROCESS" | "SCHEDULED" | "FAILED" | "CANCELED" | "COMPLETED" | string;
  auctionId: number;
  title: string;
  auctionImageUrl: string;
  startPrice: number;
  currentPrice?: number;
  endPrice?: number;
  discountPercent?: number;
  startedAt: string;
}

interface LikeData {
  slice: LikeSliceItem[];
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

const fetchAuctionLike = async (): Promise<UserAuctionLikeItemType[]> => {
  const response = await httpClient<LikeData>(API_ENDPOINTS.myLikes, {
    method: "GET",
  });

  const slice = response.data?.slice ?? [];

  return slice
    .filter((item): item is LikeSliceItem => item != null)
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
        discountRate: item.discountPercent,
        status: mapStatusToTradeStatus(item.status),
        date: item.startedAt,
      };
    });
};

const removeLike = async (auctionId: number) => {
  await httpClient(API_ENDPOINTS.removeMyLike(auctionId), {
    method: "POST",
  });
};

export const userAuctionLikeKeys = {
  all: ["user", "myLikes"] as const,
};

export function useUserAuctionLike() {
  return useQuery({
    queryKey: userAuctionLikeKeys.all,
    queryFn: fetchAuctionLike,
  });
}

export function useRemoveLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeLike,
    onMutate: (auctionId) => {
      const snapshot = getAuctionsCacheSnapshot(queryClient);
      updateAuctionsCache(queryClient, auctionId, { isLiked: false });
      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      restoreAuctionsCache(queryClient, ctx?.snapshot);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userAuctionLikeKeys.all });
    },
  });
}
