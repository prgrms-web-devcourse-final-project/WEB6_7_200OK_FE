import type { ComponentProps } from "react";

import { Heart } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

interface LikeButtonProps extends ComponentProps<"button"> {
  isLiked: boolean;
  onToggle?: () => void;
}

export default function LikeButton({ isLiked, onToggle, className, ...props }: LikeButtonProps) {
  return (
    <button
      type="button"
      aria-label={isLiked ? "관심 상품 해제하기" : "관심 상품 추가하기"}
      onClick={onToggle}
      className={cn("absolute right-3 bottom-3 rounded-full bg-transparent", className)}
      {...props}
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
