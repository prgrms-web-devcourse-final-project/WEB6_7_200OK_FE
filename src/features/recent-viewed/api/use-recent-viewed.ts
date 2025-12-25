import { useQuery } from "@tanstack/react-query";

import { MOCK_RECENT_ITEMS, RecentlyViewedItemType } from "@/entities/item";

// TODO: 실제 API 엔드포인트가 나오면 교체
const fetchRecentViewed = async (): Promise<RecentlyViewedItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RECENT_ITEMS), 500);
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
