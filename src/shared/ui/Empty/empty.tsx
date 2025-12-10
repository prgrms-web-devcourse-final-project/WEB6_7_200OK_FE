import React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { TrendingDown, type LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

const emptyIconContainerVariants = cva(
  "mb-4 flex items-center justify-center rounded-full bg-zinc-100",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-12 w-12", // 기본값
        lg: "h-16 w-16",
        xl: "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const emptyIconVariants = cva("text-brand", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6", // 기본값
      lg: "h-8 w-8",
      xl: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface EmptyProps extends VariantProps<typeof emptyIconContainerVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode | LucideIcon;
  className?: string;
}

export function Empty({
  title = "아직 가격 하락 기록이 없어요",
  description = "가격이 하락하면 여기에 표시됩니다",
  icon: IconProp,
  className,
  size,
}: EmptyProps) {
  const renderIcon = () => {
    if (IconProp) {
      const Icon = IconProp as LucideIcon;
      return <Icon className={cn(emptyIconVariants({ size }))} />;
    }

    return <TrendingDown className={cn(emptyIconVariants({ size }))} />;
  };

  return (
    <div
      className={cn(
        "bg-card flex flex-col items-center justify-center rounded-md border border-zinc-200 p-10 text-center shadow-sm",
        className
      )}
    >
      <div className={cn(emptyIconContainerVariants({ size }))}>{renderIcon()}</div>
      <h3 className="mb-1 text-lg font-semibold text-zinc-800">{title}</h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}
