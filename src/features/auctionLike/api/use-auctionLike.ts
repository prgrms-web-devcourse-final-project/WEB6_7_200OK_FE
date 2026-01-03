import { useQuery } from "@tanstack/react-query";

import { MOCK_AUCTIONLIKE_ITEMS, AuctionLikeItemType } from "@/entities/item";

// TODO: 실제 API 엔드포인트가 나오면 교체
const fetchAuctionLike = async (): Promise<AuctionLikeItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_AUCTIONLIKE_ITEMS), 500);
  });

export const auctionLikeKeys = {
  all: ["user", "auctionLike"] as const,
};

export function useAuctionLike() {
  return useQuery({
    queryKey: auctionLikeKeys.all,
    queryFn: fetchAuctionLike,
  });
}
