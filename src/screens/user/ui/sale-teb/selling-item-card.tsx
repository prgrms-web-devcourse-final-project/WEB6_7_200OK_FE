"use client";

import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

import { SellingItem } from "../../model/types";
import { ItemCardTemplate } from "../_base/item-card-template";

interface SellingItemCardProps {
  item: SellingItem;
  onClick?: (item: SellingItem) => void;
  onDelete?: (item: SellingItem) => void;
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

export function SellingItemCard({ item, onClick, onDelete }: SellingItemCardProps) {
  const isSoldOut = item.status === "판매 완료";
  const isAuctionEnded = item.status === "경매 종료";
  const isOnSale = item.status === "판매중";
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
        !isOnSale && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(item);
            }}
            className="text-muted-foreground hover:text-foreground flex size-4 items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
            aria-label="삭제"
          >
            <X className="size-4" />
          </button>
        )
      }
      overlayNode={
        (isSoldOut || isAuctionEnded) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <span className="text-brand-contrast text-base font-medium">
              {isSoldOut ? "판매 완료" : "경매 종료"}
            </span>
          </div>
        )
      }
    />
  );
}
