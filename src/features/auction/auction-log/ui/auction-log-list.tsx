import { TrendingDown } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import { EmptyState } from "@/shared/ui";

export default function AuctionLogList({ isSheet = false }: { isSheet?: boolean }) {
  const MOCK = [
    {
      prev: "76800",
      now: "75000",
      time: "50분전",
    },
    {
      prev: "76800",
      now: "74000",
      time: "50분전",
    },
    {
      prev: "76800",
      now: "73000",
      time: "50분전",
    },
    {
      prev: "76800",
      now: "72000",
      time: "50분전",
    },
    {
      prev: "76800",
      now: "71000",
      time: "50분전",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h3 className={cn(isSheet ? "text-base" : "text-2xl", "font-medium")}>
          하락 {MOCK.length !== 0 ? MOCK.length : ""}
        </h3>
        {MOCK.length !== 0 && <span className="text-base text-red-400">▼ 40,000(-5.0%)</span>}
      </div>
      {MOCK.length === 0 ? (
        <EmptyState
          Icon={TrendingDown}
          title="아직 가격 하락 기록이 없어요"
          description="가격이 하락하면 여기에 표시됩니다."
          size="md"
        />
      ) : (
        <ul className={cn("flex flex-col", isSheet ? "gap-3" : "gap-2")}>
          {MOCK.map((item) => (
            <ProductLogListItem key={item.now} prev={item.prev} now={item.now} time={item.time} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductLogListItem({ prev, now, time }: { prev: string; now: string; time: string }) {
  return (
    <li className="flex justify-between text-base">
      <div className="flex gap-1 font-medium">
        <span className="text-red-400 line-through">{prev}</span>
        <span>→</span>
        <span>{now}</span>
      </div>
      <time className="text-muted-foreground">{time}</time>
    </li>
  );
}
