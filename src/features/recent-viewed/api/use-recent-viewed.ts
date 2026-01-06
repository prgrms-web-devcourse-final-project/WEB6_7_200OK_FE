import { useQuery } from "@tanstack/react-query";

import { UserRecentlyViewedItemType } from "@/entities/auction";

// TODO: 실제 API 엔드포인트가 나오면 교체
const getUserRecentViewed = async (): Promise<UserRecentlyViewedItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve([]), 500);
  });

export const userRecentViewedKeys = {
  all: ["user", "recent-viewed"] as const,
};

export function useRecentViewedItems() {
  return useQuery({
    queryKey: userRecentViewedKeys.all,
    queryFn: getUserRecentViewed,
  });
}
