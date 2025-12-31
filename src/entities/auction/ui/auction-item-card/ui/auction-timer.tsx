"use client";

import { useEffect, useRef, useState } from "react";

import { Calendar, Timer, type LucideIcon } from "lucide-react";

import { calculateRemainingSeconds } from "@/shared/lib/utils/time/calc";
import { formatRemaining } from "@/shared/lib/utils/time/format";

export type AuctionTimerType = "drop" | "start";

const AUCTION_TIMER_MAP: Record<
  AuctionTimerType,
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
  type: AuctionTimerType;
  now: number;
  startedAt: string;
  onExpire?: () => void;
}

export default function AuctionTimer({ type, now, startedAt, onExpire }: AuctionTimerProps) {
  const { label, ariaLabel, Icon } = AUCTION_TIMER_MAP[type];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const remainSeconds =
    type === "drop"
      ? calculateRemainingSeconds(now)
      : calculateRemainingSeconds(now, Date.parse(startedAt));

  const prevRemainSecondsRef = useRef<number | null>(null);

  useEffect(() => {
    const prev = prevRemainSecondsRef.current;
    prevRemainSecondsRef.current = remainSeconds;

    if (prev === null) return;

    if (prev <= 1 && remainSeconds > prev) {
      onExpire?.();
    }
  }, [remainSeconds, onExpire]);

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
        <time dateTime={dateTime} className="ml-auto font-semibold">
          {time} 후
        </time>
      ) : (
        <span className="ml-auto font-semibold" />
      )}
    </div>
  );
}
