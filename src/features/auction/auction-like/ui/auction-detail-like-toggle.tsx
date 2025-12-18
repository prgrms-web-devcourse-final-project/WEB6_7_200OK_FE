"use client";

import { useState } from "react";

import { Heart } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import { Button } from "@/shared/ui";

export default function AuctionDetailLikeToggle() {
  const [isActive, setIsActive] = useState(false);
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-auto w-12 flex-col gap-2 py-2 text-xs",
        isActive ? "text-muted-foreground" : "text-primary"
      )}
      size="sm"
      onClick={() => setIsActive((prev) => !prev)}
    >
      <Heart
        className={cn(isActive ? "text-zinc-800 dark:text-zinc-300" : "fill-red-500 text-red-500")}
      />
      1.1
    </Button>
  );
}
