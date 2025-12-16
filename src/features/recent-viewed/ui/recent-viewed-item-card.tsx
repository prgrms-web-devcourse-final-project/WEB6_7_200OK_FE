"use client";

import { X } from "lucide-react";

import { RecentlyViewedItem } from "@/entities/item/model/types";
import { ItemBadge } from "@/entities/item/ui/item-badge";
import { ItemCard } from "@/entities/item/ui/item-card";

interface RecentViewedItemCardProps {
  item: RecentlyViewedItem;
  onClick?: (item: RecentlyViewedItem) => void;
  onRemove?: (item: RecentlyViewedItem) => void;
}

export function RecentViewedItemCard({ item, onClick, onRemove }: RecentViewedItemCardProps) {
  const isSoldOut = item.status === "판매 완료";
  const isAuctionEnded = item.status === "경매 종료";
  const isScheduled = item.status === "경매 예정";

  return (
    <ItemCard
      name={item.name}
      imageUrl={item.imageUrl}
      date={item.date}
      price={item.price}
      originalPrice={item.originalPrice}
      discountRate={item.discountRate}
      isPriceGray={isScheduled}
      onClick={() => onClick?.(item)}
      badgeNode={<ItemBadge status={item.status} />}
      actionNode={
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(item);
          }}
          className="text-muted-foreground hover:text-foreground flex size-4 items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
          aria-label="최근 본 상품에서 삭제"
        >
          <X className="size-4" />
        </button>
      }
      overlayNode={
        (isSoldOut || isAuctionEnded) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <span className="text-background text-base">
              {isSoldOut ? "판매 완료" : "경매 종료"}
            </span>
          </div>
        )
      }
    />
  );
}
