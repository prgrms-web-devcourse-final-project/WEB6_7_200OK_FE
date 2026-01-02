"use client";

import { useAuctionTicker } from "@/entities/auction/hooks/use-auction-ticker";
import type { AuctionStatusType } from "@/entities/auction/model/status";
import { calcMsPercent } from "@/shared/lib/utils/time/calc";
import { formatMs } from "@/shared/lib/utils/time/format";
import { Progress } from "@/shared/ui/progress/progress";

const AUCTION_PROCESS_LABEL: Record<AuctionStatusType, string> = {
  PROCESS: "다음 가격하락까지",
  CANCELED: "-",
  COMPLETED: "-",
  FAILED: "-",
  SCHEDULED: "경매 시작까지",
} as const;

export function AuctionProgress({ status }: { status: AuctionStatusType }) {
  const { remainMs, duration } = useAuctionTicker();

  const formatted = formatMs(remainMs);
  const { remain } = calcMsPercent(remainMs, duration);
  const isProcess = status === "PROCESS" || status === "SCHEDULED";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-normal">{AUCTION_PROCESS_LABEL[status]}</h3>
        <time className="text-2xl font-medium">{isProcess ? formatted : ""}</time>
      </div>
      <Progress value={isProcess ? remain : 0} indicatorClassName="bg-brand" />
    </div>
  );
}
