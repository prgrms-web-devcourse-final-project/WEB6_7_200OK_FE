import { cva, type VariantProps } from "class-variance-authority";
import { TrendingDown, type LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

const emptyIconContainerVariants = cva(
  "bg-accent mb-4 flex items-center justify-center rounded-full",
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
  icon?: LucideIcon;
  className?: string;
}

export default function Empty({
  title = "아직 가격 하락 기록이 없습니다",
  description = "가격이 하락하면 여기에 표시됩니다",
  icon: IconProp,
  className,
  size,
}: EmptyProps) {
  const renderIcon = () => {
    const Icon = IconProp ?? TrendingDown;
    return <Icon className={cn(emptyIconVariants({ size }))} />;
  };

  return (
    <div
      className={cn(
        "bg-card border-border flex flex-col items-center justify-center rounded-md border text-center",
        "p-8 md:p-10 lg:p-12 xl:p-14",
        className
      )}
    >
      <div className={cn(emptyIconContainerVariants({ size }))} aria-hidden="true">
        {renderIcon()}
      </div>
      <p className="text-foreground mb-1 text-lg font-semibold">{title}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
