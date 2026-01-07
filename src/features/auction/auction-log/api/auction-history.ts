import { useInfiniteQuery } from "@tanstack/react-query";

import type { RecentPriceHistoryType } from "@/features/auction/auction-log/model/types";

interface HistoryPage {
  slice: RecentPriceHistoryType[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}

async function fetchAuctionHistory(auctionId: string | number, page: number, size: number) {
  const res = await fetch(`/api/v1/auctions/${auctionId}/history?page=${page}&size=${size}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch history");

  const json = await res.json();
  return json.data as HistoryPage;
}

export function useAuctionHistoryInfinite(auctionId: string | number, size = 10) {
  return useInfiniteQuery({
    queryKey: ["auctionHistory", auctionId, size],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchAuctionHistory(auctionId, pageParam, size),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}
