"use client";

import { useAuctionTicker } from "@/entities/auction/hooks/use-auction-ticker";
import { calcMsPercent } from "@/shared/lib/utils/time/calc";
import { formatMs } from "@/shared/lib/utils/time/format";
import { Progress } from "@/shared/ui/progress/progress";

export function AuctionProgress() {
  const { remainMs, duration } = useAuctionTicker();

  const formatted = formatMs(remainMs);
  const { remain } = calcMsPercent(remainMs, duration);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-normal">다음 가격 하락까지</h3>
        <time className="text-2xl font-medium">{formatted}</time>
      </div>
      <Progress value={remain} indicatorClassName="bg-brand" />
    </div>
  );
}
