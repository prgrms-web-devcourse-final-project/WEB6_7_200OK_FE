import type { AuctionType } from "@/entities/auction/model/types";
import type { AuctionListData } from "@/screens/auction/auction-list/model/types";
import type { AuctionsData } from "@/screens/main/model/types";

import type { InfiniteData, QueryClient, QueryKey } from "@tanstack/react-query";

type AuctionCachePatch = Partial<Pick<AuctionType, "isLiked" | "isNotification">>;

export interface AuctionsCacheSnapshot {
  auctionsData?: AuctionsData;
  searchQueries: [QueryKey, InfiniteData<AuctionListData> | undefined][];
}

function updateListItem<T extends { auctionId: number }>(
  list: T[],
  auctionId: number | string,
  patch: AuctionCachePatch
) {
  const index = list.findIndex((item) => String(item.auctionId) === String(auctionId));
  if (index === -1) {
    return { next: list, changed: false };
  }

  const next = list.slice();
  next[index] = { ...next[index], ...patch };
  return { next, changed: true };
}

function updateMainAuctionsData(
  data: AuctionsData,
  auctionId: number | string,
  patch: AuctionCachePatch
) {
  const popular = updateListItem(data.popularList, auctionId, patch);
  const process = updateListItem(data.processList, auctionId, patch);
  const scheduled = updateListItem(data.scheduledList, auctionId, patch);

  if (!popular.changed && !process.changed && !scheduled.changed) {
    return data;
  }

  return {
    ...data,
    popularList: popular.next,
    processList: process.next,
    scheduledList: scheduled.next,
  };
}

function updateSearchAuctionsData(
  data: InfiniteData<AuctionListData>,
  auctionId: number | string,
  patch: AuctionCachePatch
) {
  let changed = false;
  const pages = data.pages.map((page) => {
    const updated = updateListItem(page.slice, auctionId, patch);
    if (!updated.changed) return page;
    changed = true;
    return { ...page, slice: updated.next };
  });

  if (!changed) return data;

  return { ...data, pages };
}

export function getAuctionsCacheSnapshot(queryClient: QueryClient): AuctionsCacheSnapshot {
  return {
    auctionsData: queryClient.getQueryData<AuctionsData>(["auctions"]),
    searchQueries: queryClient.getQueriesData<InfiniteData<AuctionListData>>({
      queryKey: ["auctions", "search"],
    }),
  };
}

export function restoreAuctionsCache(
  queryClient: QueryClient,
  snapshot: AuctionsCacheSnapshot | undefined
) {
  if (!snapshot) return;

  if (snapshot.auctionsData !== undefined) {
    queryClient.setQueryData(["auctions"], snapshot.auctionsData);
  }

  snapshot.searchQueries.forEach(([key, data]) => {
    if (data !== undefined) {
      queryClient.setQueryData(key, data);
    }
  });
}

export function updateAuctionsCache(
  queryClient: QueryClient,
  auctionId: number | string,
  patch: AuctionCachePatch
) {
  queryClient.setQueryData<AuctionsData>(["auctions"], (data) => {
    if (!data) return data;
    return updateMainAuctionsData(data, auctionId, patch);
  });

  queryClient.setQueriesData<InfiniteData<AuctionListData>>(
    { queryKey: ["auctions", "search"] },
    (data) => {
      if (!data) return data;
      return updateSearchAuctionsData(data, auctionId, patch);
    }
  );
}
