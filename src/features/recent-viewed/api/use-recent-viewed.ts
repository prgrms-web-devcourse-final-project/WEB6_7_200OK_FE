import { useQuery } from "@tanstack/react-query";

import { MOCK_RECENT_ITEMS, UserRecentlyViewedItemType } from "@/entities/auction";

// TODO: 실제 API 엔드포인트가 나오면 교체
const getUserRecentViewed = async (): Promise<UserRecentlyViewedItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RECENT_ITEMS), 500);
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
