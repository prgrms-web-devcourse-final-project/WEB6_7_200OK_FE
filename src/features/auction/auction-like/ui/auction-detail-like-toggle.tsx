"use client";

import { useState } from "react";

import { Heart } from "lucide-react";

import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { cn } from "@/shared/lib/utils/utils";
import { Button } from "@/shared/ui";

interface AuctionDetailLikeToggleProps {
  userId: string | undefined;
  isLike: boolean;
  likeCount: number;
}

export default function AuctionDetailLikeToggle({
  userId,
  likeCount,
  isLike,
}: AuctionDetailLikeToggleProps) {
  const [isActive, setIsActive] = useState(isLike);
  const [likedCount] = useState(likeCount);

  const handleToggleButton = () => {
    if (typeof userId === "string") {
      setIsActive((prev) => !prev);
    } else {
      showToast.error("로그인 후 이용 가능합니다.");
    }
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "h-auto w-12 flex-col gap-2 py-2 text-xs",
        !isActive ? "text-muted-foreground" : "text-primary"
      )}
      size="sm"
      onClick={handleToggleButton}
    >
      <Heart
        className={cn(!isActive ? "text-zinc-800 dark:text-zinc-300" : "fill-red-500 text-red-500")}
      />
      {likedCount}
    </Button>
  );
}
