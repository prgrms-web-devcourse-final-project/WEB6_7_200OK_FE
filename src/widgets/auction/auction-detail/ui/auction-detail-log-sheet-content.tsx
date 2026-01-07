import { useRef, useEffect } from "react";

import { type ItemCategory } from "@/entities/auction";
import {
  AuctionDetailThumbnail,
  AuctionLogChart,
  AuctionLogList,
} from "@/features/auction/auction-log";
import { useAuctionHistoryInfinite } from "@/features/auction/auction-log/api/auction-history";
import { Spinner } from "@/shared/ui";

interface AuctionDetailLogSheetProps {
  title: string;
  category: ItemCategory;
  thumbnail: string;
  startPrice: number;
  dropAmount: number;
  auctionId: string | number;
}

export default function AuctionDetailLogSheetContent({
  title,
  category,
  thumbnail,
  startPrice,
  dropAmount,
  auctionId,
}: AuctionDetailLogSheetProps) {
  const targetRef = useRef(null);
  const scrollRef = useRef(null);

  const { data, status, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useAuctionHistoryInfinite(auctionId);

  useEffect(() => {
    const root = scrollRef.current;
    const target = targetRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasNextPage) fetchNextPage();
        }
      },
      {
        root,
        rootMargin: "24px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (status === "pending") return <p>로딩 중...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;
  const items = data.pages.flatMap((p) => p.slice);
  return (
    <div className="flex h-[calc(100vh-56px)] flex-col gap-8 px-4">
      <AuctionDetailThumbnail title={title} category={category} thumbnail={thumbnail} />
      <AuctionLogChart item={items} />

      <div ref={scrollRef} className="mb-6 flex-1 overflow-y-auto">
        <AuctionLogList
          isSheet
          recentPriceHistory={items}
          startPrice={startPrice}
          dropAmount={dropAmount}
        />
        {hasNextPage && (
          <div ref={targetRef} className="flex h-12 items-center justify-center">
            {isFetching && isFetchingNextPage && <Spinner />}
          </div>
        )}
      </div>
    </div>
  );
}
