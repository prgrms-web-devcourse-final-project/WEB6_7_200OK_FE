"use client";

import { cva } from "class-variance-authority";
import { Settings, BellRing } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

import { NotificationItem } from "../../model/types";
import { ItemCardTemplate } from "../_base/item-card-template";

interface NotificationItemCardProps {
  item: NotificationItem;
  onClick?: (item: NotificationItem) => void;
  onSettingClick?: (item: NotificationItem) => void;
}

const badgeVariants = cva(
  "flex items-center justify-center rounded-full px-2 py-1 text-xs leading-4 font-medium",
  {
    variants: {
      status: {
        판매중: "bg-brand text-brand-contrast",
        "판매 완료": "bg-brand-surface text-brand-text",
        "경매 예정": "bg-secondary text-foreground",
        "경매 종료": "bg-brand-surface text-brand-text",
      },
    },
    defaultVariants: { status: "판매중" },
  }
);

export function NotificationItemCard({ item, onClick, onSettingClick }: NotificationItemCardProps) {
  const isScheduled = item.status === "경매 예정";
  const isPriceGray = isScheduled;

  return (
    <ItemCardTemplate
      name={item.name}
      imageUrl={item.imageUrl}
      date={item.date}
      price={item.price}
      originalPrice={item.originalPrice}
      discountRate={item.discountRate}
      isPriceGray={isPriceGray}
      onClick={() => onClick?.(item)}
      badgeNode={<span className={cn(badgeVariants({ status: item.status }))}>{item.status}</span>}
      actionNode={
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSettingClick?.(item);
          }}
          className="text-muted-foreground hover:text-foreground flex size-4 items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
          aria-label="알림 설정"
        >
          <Settings className="size-4" />
        </button>
      }
      footerNode={
        item.keywords.length > 0 && (
          <div className="-mt-1 flex w-full flex-wrap items-center gap-2">
            {item.keywords.map((keyword) => (
              <div
                key={`${item.id}-${keyword}`}
                className="bg-secondary flex h-8 items-center gap-1 rounded-full px-3 py-2"
              >
                <BellRing className="text-foreground size-3.5 opacity-70" />
                <span className="text-foreground text-xs tracking-tight">{keyword}</span>
              </div>
            ))}
          </div>
        )
      }
    />
  );
}
