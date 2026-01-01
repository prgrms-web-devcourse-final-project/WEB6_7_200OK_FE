import { Calendar } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

export function UpcomingBadge({ className }: { className?: string }) {
  return (
    <div
      aria-label="경매 시작 예정 상품"
      className={cn(
        "from-brand to-brand-secondary absolute top-3 left-3 inline-flex h-6 items-center gap-2 rounded-full bg-linear-to-r px-3 py-1 text-xs leading-none font-bold text-zinc-50",
        className
      )}
    >
      <Calendar className="size-3.5 shrink-0" />
      <span className="leading-none">COMING SOON</span>
    </div>
  );
}
