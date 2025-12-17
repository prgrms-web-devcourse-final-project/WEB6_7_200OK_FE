import { cn } from "@/shared/lib/utils/utils";

const RANKING_STYLE_MAP = {
  1: "from-yellow-300 to-yellow-400",
  2: "from-zinc-200 to-zinc-300",
  3: "from-amber-400 to-amber-500",
  default: "from-zinc-400 to-zinc-500",
} as const;

interface RankingBadgeProps {
  rank: number;
}

export default function RankingBadge({ rank }: RankingBadgeProps) {
  const gradient = RANKING_STYLE_MAP[rank as 1 | 2 | 3] ?? RANKING_STYLE_MAP.default;

  return (
    <div
      aria-label={`${rank}위 인기 상품`}
      className={cn(
        "absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r text-sm font-extrabold text-white shadow-md",
        gradient
      )}
    >
      {rank}
    </div>
  );
}
