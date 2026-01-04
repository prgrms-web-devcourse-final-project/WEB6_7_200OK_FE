"use client";

import { useEffect, useState } from "react";

import { Calendar, Timer, type LucideIcon } from "lucide-react";

import { type AuctionCardTimerType } from "@/entities/auction/ui/auction-item-card/model/types";
import { useServerTimeNow } from "@/shared/lib/hooks/use-server-time-now";
import {
  calculateAuctionStartSeconds,
  calculateNextPriceDropSeconds,
} from "@/shared/lib/utils/time/calc";
import { formatRemaining } from "@/shared/lib/utils/time/format";

type AuctionActiveTimerType = Exclude<NonNullable<AuctionCardTimerType>, "ended">;

const AUCTION_TIMER_MAP: Record<
  AuctionActiveTimerType,
  {
    label: string;
    ariaLabel: string;
    Icon: LucideIcon;
  }
> = {
  drop: {
    label: "가격 하락",
    ariaLabel: "다음 가격 하락까지 남은 시간",
    Icon: Timer,
  },
  start: {
    label: "경매 시작",
    ariaLabel: "경매 시작까지 남은 시간",
    Icon: Calendar,
  },
};

interface AuctionTimerProps {
  type: AuctionActiveTimerType;
  startedAt: string;
}

export default function AuctionTimer({ type, startedAt }: AuctionTimerProps) {
  const now = useServerTimeNow();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { label, ariaLabel, Icon } = AUCTION_TIMER_MAP[type];

  const remainSeconds =
    type === "drop"
      ? calculateNextPriceDropSeconds(now)
      : calculateAuctionStartSeconds(now, startedAt);

  const time = formatRemaining(remainSeconds);
  const dateTime = `PT${remainSeconds}S`;

  return (
    <div
      className="bg-muted flex h-11 w-full items-center gap-1.5 rounded-md p-3 text-sm"
      role="group"
      aria-label={ariaLabel}
    >
      <Icon aria-hidden className="size-4" />
      <span>{label}</span>
      {mounted ? (
        <time
          dateTime={dateTime}
          className="ml-auto inline-flex w-21 justify-end font-semibold whitespace-nowrap tabular-nums"
        >
          {time} 후
        </time>
      ) : (
        <span className="ml-auto font-semibold" />
      )}
    </div>
  );
}
