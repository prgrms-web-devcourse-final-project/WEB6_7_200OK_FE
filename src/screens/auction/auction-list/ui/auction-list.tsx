"use client";

import { useEffect, useMemo } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { AlertCircle, Inbox } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { useAuctionFilters } from "@/features/auction/filters/model/use-auction-filters";
import { searchAuctionsQueryClient } from "@/screens/auction/auction-list/model/search-auctions-query.client";
import AuctionListEmpty from "@/screens/auction/auction-list/ui/auction-list-empty";
import { useServerTimeSync } from "@/shared/lib/hooks/use-server-time-sync";
import { Spinner } from "@/shared/ui";
import { AuctionGrid } from "@/widgets/auction/auction-grid";
import { AuctionGridSkeleton } from "@/widgets/auction/auction-grid/ui/auction-grid-skeleton";

export default function AuctionList() {
  const { filters } = useAuctionFilters();
  const queryOptions = searchAuctionsQueryClient(filters);

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(queryOptions);

  const items = useMemo(() => data?.pages.flatMap((page) => page.slice) ?? [], [data?.pages]);

  useServerTimeSync({
    serverTime: data?.pages?.[0]?.timeStamp,
    queryKey: queryOptions.queryKey,
  });

  const { ref, inView } = useInView({ rootMargin: "20%" });

  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  if (status === "pending") {
    return <AuctionGridSkeleton />;
  }

  if (status === "error") {
    return (
      <AuctionListEmpty
        Icon={AlertCircle}
        title="데이터를 불러오지 못했어요"
        description="잠시 후 다시 시도해주세요"
      />
    );
  }

  if (items.length === 0) {
    return (
      <AuctionListEmpty
        Icon={Inbox}
        title="현재 표시할 경매가 없습니다"
        description="새로운 경매가 곧 시작될 거예요"
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <AuctionGrid items={items} />

      <div ref={ref} className="h-1" aria-hidden="true" />

      {isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 pb-3" aria-live="polite">
          <Spinner className="text-brand-text size-6" aria-label="경매 더 불러오는 중" />
          <span className="sr-only">경매 더 불러오는 중</span>
        </div>
      )}
    </div>
  );
}
