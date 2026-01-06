import { useQuery } from "@tanstack/react-query";

import { UserAuctionLikeItemType } from "@/entities/auction";

// TODO: 실제 API 엔드포인트가 나오면 교체
const fetchAuctionLike = async (): Promise<UserAuctionLikeItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve([]), 500);
  });

export const userAuctionLikeKeys = {
  all: ["user", "auctionLike"] as const,
};

export function useUserAuctionLike() {
  return useQuery({
    queryKey: userAuctionLikeKeys.all,
    queryFn: fetchAuctionLike,
  });
}
