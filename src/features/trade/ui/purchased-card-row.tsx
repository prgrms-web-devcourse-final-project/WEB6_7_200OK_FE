"use client";

import { MessageCircle, Check, Star } from "lucide-react";

import { PurchaseItem } from "@/entities/item/model/types";
import { ItemBadge } from "@/entities/item/ui/item-badge";
import { ItemCard } from "@/entities/item/ui/item-card";
import Button from "@/shared/ui/button/button";

interface PurchasedCardRowProps {
  item: PurchaseItem;
  onReviewClick?: (item: PurchaseItem) => void;
  onConfirm?: (item: PurchaseItem) => void;
  onChatClick?: (item: PurchaseItem) => void;
}

export function PurchasedCardRow({
  item,
  onReviewClick,
  onConfirm,
  onChatClick,
}: PurchasedCardRowProps) {
  const isConfirmed = item.status === "구매 확정";
  const hasUnreadMessages = item.unreadMessageCount && item.unreadMessageCount > 0;

  return (
    <ItemCard
      name={item.name}
      imageUrl={item.imageUrl}
      date={item.date}
      price={item.price}
      originalPrice={item.originalPrice}
      discountRate={item.discountRate}
      isPriceGray={!isConfirmed}
      badgeNode={<ItemBadge status={item.status} />}
      footerNode={
        <div className="-mt-1 flex w-full items-center gap-2">
          {isConfirmed ? (
            <>
              <Button
                variant={hasUnreadMessages ? "primary" : "outline"}
                className="h-9 flex-1 gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onChatClick?.(item);
                }}
              >
                <MessageCircle className="size-4" />
                <span className="text-sm">1:1 채팅</span>
                {hasUnreadMessages && (
                  <span
                    className="text-2.5 ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white/20 px-1 text-white"
                    aria-label={`${item.unreadMessageCount}개의 읽지 않은 메시지`}
                    role="status"
                  >
                    {item.unreadMessageCount}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                className="h-9 flex-1 gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onReviewClick?.(item);
                }}
              >
                <Star className="size-4" />
                <span className="text-sm">{item.hasReview ? "리뷰 수정" : "리뷰 작성"}</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="h-9 flex-1 gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onChatClick?.(item);
                }}
              >
                <MessageCircle className="size-4" />
                <span className="text-sm">1:1 채팅</span>
              </Button>
              <Button
                variant="outline"
                className="h-9 flex-1 gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm?.(item);
                }}
              >
                <Check className="size-4" />
                <span className="text-sm">구매 확정</span>
              </Button>
            </>
          )}
        </div>
      }
    />
  );
}
