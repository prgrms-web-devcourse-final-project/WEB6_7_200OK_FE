import { TrendingDown } from "lucide-react";

import type { RecentPriceHistoryType } from "@/features/auction/auction-log/model/types";
import { calcPrevPriceFromDiscountRate, calcDiscountRate } from "@/shared/lib/utils/price/calc";
import { formatPriceKRW } from "@/shared/lib/utils/price/formatPriceKRW";
import { formatAgo } from "@/shared/lib/utils/time/format";
import { cn } from "@/shared/lib/utils/utils";
import { EmptyState } from "@/shared/ui";

interface AuctionLogListProps {
  recentPriceHistory: RecentPriceHistoryType[];
  startPrice: number;
  discountRate: number;
  isSheet?: boolean;
}

export default function AuctionLogList({
  recentPriceHistory,
  startPrice,
  discountRate,
  isSheet = false,
}: AuctionLogListProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-background sticky top-0 flex items-center gap-3">
        <h3 className={cn(isSheet ? "text-base" : "text-2xl", "font-medium")}>
          하락 {recentPriceHistory.length !== 0 ? recentPriceHistory.length : ""}
        </h3>
        {recentPriceHistory.length !== 0 && (
          <span className="text-base text-red-400">
            ▼ {formatPriceKRW(recentPriceHistory[0].currentPrice)} (-
            {calcDiscountRate(startPrice, recentPriceHistory[0].currentPrice, 1)}%)
          </span>
        )}
      </div>
      {recentPriceHistory.length === 0 ? (
        <EmptyState
          Icon={TrendingDown}
          title="아직 가격 하락 기록이 없어요"
          description="가격이 하락하면 여기에 표시됩니다."
          size="md"
        />
      ) : (
        <ul className={cn("flex flex-col", isSheet ? "gap-3" : "gap-2")}>
          {recentPriceHistory.map((history) => (
            <ProductLogListItem
              key={history.historyId}
              prevPrice={calcPrevPriceFromDiscountRate(history.currentPrice, discountRate)}
              currentPrice={history.currentPrice}
              time={history.createdAt}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductLogListItem({
  prevPrice,
  currentPrice,
  time,
}: {
  prevPrice: number;
  currentPrice: number;
  time: string;
}) {
  return (
    <li className="flex justify-between text-base">
      <div className="flex gap-1 font-medium">
        <span className="text-red-400 line-through">{formatPriceKRW(prevPrice)}</span>
        <span>→</span>
        <span>{formatPriceKRW(currentPrice)}</span>
      </div>
      <time className="text-muted-foreground">{formatAgo(time)}</time>
    </li>
  );
}
