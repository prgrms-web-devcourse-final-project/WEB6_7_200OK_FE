"use client";

import { MessageCircle, X } from "lucide-react";

import { SellingItem } from "@/entities/item/model/types";
import { ItemBadge } from "@/entities/item/ui/item-badge";
import { ItemCard } from "@/entities/item/ui/item-card";
import Button from "@/shared/ui/button/button";

interface SellingItemCardProps {
  item: SellingItem;
  onClick?: (item: SellingItem) => void;
  onDelete?: (item: SellingItem) => void;
  onChatClick?: (item: SellingItem) => void;
  isOwn?: boolean;
}

export function SellingItemCard({
  item,
  onClick,
  onDelete,
  onChatClick,
  isOwn = false,
}: SellingItemCardProps) {
  const isSoldOut = item.status === "판매 완료";
  const isAuctionEnded = item.status === "경매 종료";
  const isOnSale = item.status === "판매중";
  const isScheduled = item.status === "경매 예정";
  const hasUnreadMessages = item.unreadMessageCount && item.unreadMessageCount > 0;

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
        isOwn &&
        !isOnSale &&
        !isSoldOut && (
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
      footerNode={
        isOwn &&
        isSoldOut && (
          <div className="-mt-1 flex w-full items-center gap-2">
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChatClick?.(item);
              }}
              className={`h-9 flex-1 gap-1 rounded-lg ${
                hasUnreadMessages
                  ? "bg-brand hover:bg-brand/90"
                  : "bg-background hover:bg-accent border-border border"
              }`}
            >
              <MessageCircle
                className={`size-4 ${hasUnreadMessages ? "text-background" : "text-foreground"}`}
              />
              <span
                className={`text-sm font-medium ${
                  hasUnreadMessages ? "text-background" : "text-foreground"
                }`}
              >
                1:1 채팅
              </span>
              {hasUnreadMessages && (
                <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white/20 px-1 text-[10px] font-medium text-white">
                  {item.unreadMessageCount}
                </span>
              )}
            </Button>
          </div>
        )
      }
    />
  );
}
