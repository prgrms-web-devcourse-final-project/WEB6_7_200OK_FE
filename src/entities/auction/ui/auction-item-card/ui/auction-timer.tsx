import { Calendar, Timer, type LucideIcon } from "lucide-react";

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
  time: string;
}

export default function AuctionTimer({ type, time }: AuctionTimerProps) {
  const { label, ariaLabel, Icon } = AUCTION_TIMER_MAP[type];

  return (
    <div
      className="bg-muted flex h-11 w-full items-center gap-1.5 rounded-md p-3 text-sm"
      role="group"
      aria-label={ariaLabel}
    >
      <Icon aria-hidden className="size-4" />
      <span>{label}</span>
      <time dateTime={time} className="ml-auto font-semibold">
        {time}
      </time>
    </div>
  );
}
