import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils/utils";

export type ItemStatus =
  | "판매중"
  | "판매 완료"
  | "경매 예정"
  | "경매 종료"
  | "구매 완료"
  | "구매 확정";

const badgeVariants = cva(
  "flex items-center justify-center rounded-full px-2 py-1 text-xs leading-4 font-medium",
  {
    variants: {
      status: {
        판매중: "bg-brand text-brand-contrast",
        "판매 완료": "bg-brand-surface text-brand-text",
        "경매 예정": "bg-secondary text-foreground",
        "경매 종료": "bg-brand-surface text-brand-text",
        "구매 완료": "bg-brand-surface text-brand-text",
        "구매 확정": "bg-brand text-brand-contrast",
      } satisfies Record<ItemStatus, string>,
    },
    defaultVariants: { status: "판매중" },
  }
);

interface ItemBadgeProps {
  status: ItemStatus;
  className?: string;
}

export function ItemBadge({ status, className }: ItemBadgeProps) {
  return <span className={cn(badgeVariants({ status }), className)}>{status}</span>;
}
