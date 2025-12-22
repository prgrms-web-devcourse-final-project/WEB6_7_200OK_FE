import { useQuery } from "@tanstack/react-query";

import { MOCK_RECENT_ITEMS, RecentlyViewedItemType } from "@/entities/item";

const fetchRecentViewed = async (): Promise<RecentlyViewedItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RECENT_ITEMS), 500); // 서버 지연 테스트 0.5초
  });

export const recentViewedKeys = {
  all: ["user", "recent-viewed"] as const,
};

export function useRecentViewedItems() {
  return useQuery({
    queryKey: recentViewedKeys.all,
    queryFn: fetchRecentViewed,
  });
}
