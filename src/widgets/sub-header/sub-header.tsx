"use client";

import type { ComponentProps, ReactNode } from "react";

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

interface SubHeaderProps extends Omit<ComponentProps<"header">, "children" | "content"> {
  content?: ReactNode;
}

export function SubHeader({ content = "", className, ...props }: SubHeaderProps) {
  const router = useRouter();

  return (
    <header className={cn("w-full lg:hidden", className)} {...props}>
      <div className="h-header flex items-center gap-3 px-2.5">
        <Button variant="ghost" size="icon-lg" aria-label="뒤로가기" onClick={() => router.back()}>
          <ChevronLeft />
        </Button>

        <div className="flex flex-1 items-center">
          {typeof content === "string" ? (
            <h1 className="truncate font-semibold">{content}</h1>
          ) : (
            content
          )}
        </div>
      </div>
    </header>
  );
}
