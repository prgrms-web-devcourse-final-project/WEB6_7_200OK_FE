"use client";

import { useState } from "react";

import { Bell } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

export default function ProductNotificationToggle() {
  const [isActive, setIsActive] = useState(false);
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-auto flex-col py-2 text-xs",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
      size="sm"
      onClick={() => setIsActive((prev) => !prev)}
    >
      <Bell
        className={cn(
          "text-zinc-800 dark:text-zinc-300",
          isActive && "fill-zinc-800 dark:fill-zinc-300"
        )}
      />
      {isActive ? "알림 취소" : "알림 받기"}
    </Button>
  );
}
