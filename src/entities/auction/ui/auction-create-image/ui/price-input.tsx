import * as React from "react";

import { cn } from "@/shared/lib/utils/utils";
import Input from "@/shared/ui/input/input";

interface PriceInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  error?: string;
}

export function PriceInput({ className, error, ...props }: PriceInputProps) {
  return (
    <div className="w-full">
      <div
        className={cn(
          "border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 items-center gap-2 rounded-lg border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]",
          error && "border-destructive"
        )}
      >
        <span className="text-muted-foreground shrink-0">₩</span>
        <Input
          type="number"
          className={cn(
            "h-full flex-1 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 md:text-base dark:bg-transparent",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
    </div>
  );
}
