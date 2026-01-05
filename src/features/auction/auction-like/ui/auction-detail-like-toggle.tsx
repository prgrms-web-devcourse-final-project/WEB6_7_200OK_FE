"use client";

import { Heart } from "lucide-react";

import { useAuctionLike } from "@/features/auction/auction-like/hook/use-auction-like";
import { cn } from "@/shared/lib/utils/utils";
import { Button } from "@/shared/ui";

interface AuctionDetailLikeToggleProps {
  auctionId: number | string;
  initIsLiked: boolean;
  initLikeCount: number;
}

export default function AuctionDetailLikeToggle({
  auctionId,
  initIsLiked,
  initLikeCount,
}: AuctionDetailLikeToggleProps) {
  const { isLiked, likeCount, toggleLike, isPending } = useAuctionLike({
    auctionId,
    initIsLiked,
    initLikeCount,
  });

  return (
    <Button
      variant="ghost"
      className={cn(
        "h-auto w-12 flex-col gap-2 py-2 text-xs",
        !isLiked ? "text-muted-foreground" : "text-primary"
      )}
      size="sm"
      onClick={() => {
        toggleLike();
      }}
      disabled={isPending}
    >
      <Heart
        className={cn(!isLiked ? "text-zinc-800 dark:text-zinc-300" : "fill-red-500 text-red-500")}
      />
      {likeCount}
    </Button>
  );
}
