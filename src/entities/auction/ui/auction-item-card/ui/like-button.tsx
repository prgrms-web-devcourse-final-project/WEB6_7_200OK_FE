"use client";

import type { ComponentProps } from "react";

import { Heart } from "lucide-react";

import { useAuctionLike } from "@/features/auction/auction-like/hook/use-auction-like";
import { cn } from "@/shared/lib/utils/utils";

interface LikeButtonProps extends ComponentProps<"button"> {
  auctionId: number;
  initIsLiked: boolean;
}

export default function LikeButton({
  auctionId,
  initIsLiked,
  className,
  ...props
}: LikeButtonProps) {
  const { isLiked, toggleLike, isPending } = useAuctionLike({
    auctionId,
    initIsLiked,
  });

  return (
    <button
      type="button"
      aria-label={isLiked ? "관심 상품 해제하기" : "관심 상품 추가하기"}
      onClick={(event) => {
        event.preventDefault();
        toggleLike();
      }}
      className={cn(
        "absolute right-2 bottom-2 flex size-10 items-center justify-center rounded-full bg-transparent",
        className
      )}
      {...props}
      disabled={isPending}
    >
      <Heart
        className={cn(
          "size-5 drop-shadow-lg",
          isLiked ? "fill-red-500 text-red-500" : "text-white"
        )}
      />
    </button>
  );
}
