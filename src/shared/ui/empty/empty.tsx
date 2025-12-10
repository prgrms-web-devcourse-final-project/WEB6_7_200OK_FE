import { cva, type VariantProps } from "class-variance-authority";
import { PackageOpen, type LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

const emptyStyles = {
  container: cva(
    "bg-card border-border flex flex-col items-center justify-center rounded-md border p-8 text-center md:p-10 lg:p-12 xl:p-14"
  ),
  iconContainer: cva("bg-accent mb-4 flex items-center justify-center rounded-full", {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-12 w-12", // 기본 48px
        lg: "h-16 w-16",
        xl: "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }),
  icon: cva("text-brand", {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6", // 기본 24px
        lg: "h-8 w-8",
        xl: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }),
};

interface EmptyProps extends VariantProps<typeof emptyStyles.iconContainer> {
  title?: string;
  description?: string;
  Icon?: LucideIcon;
  className?: string;
}

export default function Empty({
  title = "등록된 경매가 없습니다.",
  description = "새로운 경매를 등록해보세요.",
  Icon = PackageOpen,
  className,
  size = "md",
}: EmptyProps) {
  return (
    <div className={cn(emptyStyles.container(), className)}>
      <div className={cn(emptyStyles.iconContainer({ size }))} aria-hidden="true">
        <Icon className={cn(emptyStyles.icon({ size }))} />
      </div>
      <p className="text-foreground mb-1 text-lg font-semibold">{title}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
