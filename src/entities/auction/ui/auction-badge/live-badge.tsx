import { cn } from "@/shared/lib/utils/utils";

export function LiveBadge({ className }: { className?: string }) {
  return (
    <div
      aria-label="실시간 경매 진행 중"
      className={cn(
        "absolute top-3 left-3 inline-flex h-6 items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-xs leading-none font-bold text-zinc-50",
        className
      )}
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-white/50" />
      <span className="leading-none">LIVE</span>
    </div>
  );
}
