"use client";

import { MessageCircle, Check, Star } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

import { PurchaseItem } from "../../model/types";
import { ItemCardTemplate } from "../_base/item-card-template";

interface PurchasedItemCardProps {
  item: PurchaseItem;
  onReviewClick?: (item: PurchaseItem) => void;
}

export function PurchasedItemCard({ item, onReviewClick }: PurchasedItemCardProps) {
  const isConfirmed = item.status === "구매 확정";

  return (
    <ItemCardTemplate
      name={item.name}
      imageUrl={item.imageUrl}
      date={item.date}
      price={item.price}
      originalPrice={item.originalPrice}
      discountRate={item.discountRate}
      isPriceGray={!isConfirmed}
      badgeNode={
        <span
          className={cn(
            "rounded-full px-2 py-1 text-xs leading-4 font-medium",
            isConfirmed ? "bg-brand text-brand-contrast" : "bg-brand-surface text-brand-text"
          )}
        >
          {item.status}
        </span>
      }
      footerNode={
        <div className="-mt-1 flex w-full items-center gap-2">
          {isConfirmed ? (
            <>
              <Button className="bg-brand hover:bg-brand/90 h-9 flex-1 gap-1">
                <MessageCircle className="text-brand-contrast size-4" />
                <span className="text-brand-contrast text-sm font-medium">1:1 채팅</span>
                {item.unreadMessageCount && item.unreadMessageCount > 0 && (
                  <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white/20 px-1 text-[10px] text-white">
                    {item.unreadMessageCount}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-accent h-9 flex-1 gap-1"
                onClick={() => onReviewClick?.(item)}
              >
                <Star className="text-foreground size-4" />
                <span className="text-foreground text-sm">
                  {item.hasReview ? "리뷰 수정" : "리뷰 작성"}
                </span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-border hover:bg-accent h-9 flex-1 gap-1">
                <MessageCircle className="text-foreground size-4" />
                <span className="text-foreground text-sm font-medium">1:1 채팅</span>
              </Button>
              <Button variant="outline" className="border-border hover:bg-accent h-9 flex-1 gap-1">
                <Check className="text-foreground size-4" />
                <span className="text-foreground text-sm">구매 확정</span>
              </Button>
            </>
          )}
        </div>
      }
    />
  );
}
