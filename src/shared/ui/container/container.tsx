import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils/utils";

export function Container({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4", className)} {...props}>
      {children}
    </div>
  );
}
