import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { PackageOpen, type LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "bg-card border-border flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-md border p-8 text-center text-balance md:p-10 lg:p-12 xl:p-14",
        className
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2 text-center", className)}
      {...props}
    />
  );
}

function EmptyMedia({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-icon" className={cn(className)} {...props} />;
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-foreground mb-1 text-lg font-semibold", className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm font-normal [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  );
}

const emptyStyles = {
  iconContainer: cva("bg-accent mb-4 flex items-center justify-center rounded-full", {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-12 w-12",
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
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }),
};

interface EmptyStateProps extends VariantProps<typeof emptyStyles.iconContainer> {
  title?: string;
  description?: string;
  Icon?: LucideIcon;
  className?: string;
}

function EmptyState({
  title = "등록된 경매가 없습니다.",
  description = "새로운 경매를 등록해보세요.",
  Icon = PackageOpen,
  className,
  size = "md",
}: EmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia className={cn(emptyStyles.iconContainer({ size }))} aria-hidden="true">
          <Icon className={cn(emptyStyles.icon({ size }))} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export default EmptyState;
