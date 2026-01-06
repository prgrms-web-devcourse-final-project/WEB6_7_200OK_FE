"use client";

import Link from "next/link";

import { MessageCircle, X } from "lucide-react";

import { UserItemBadge, UserItemCard, type UserSellingItemType } from "@/entities/auction";
import { Button } from "@/shared/ui";

interface UserSellingItemCardProps {
  item: UserSellingItemType;
  onClick?: (item: UserSellingItemType) => void;
  onDelete?: (item: UserSellingItemType) => void;
  isOwn?: boolean;
}

export function UserSellingItemCard({
  item,
  onClick,
  onDelete,
  isOwn = false,
}: UserSellingItemCardProps) {
  const isSoldOut = item.status === "판매 완료";
  const isAuctionEnded = item.status === "경매 종료";
  const isOnSale = item.status === "판매중";
  const isScheduled = item.status === "경매 예정";
  const hasUnreadMessages = item.unreadMessageCount ? item.unreadMessageCount > 0 : false;
  const canNavigate = !(isSoldOut || isAuctionEnded);

  return (
    <UserItemCard
      name={item.name}
      imageUrl={item.imageUrl}
      date={item.date}
      price={item.price}
      originalPrice={item.originalPrice}
      discountRate={item.discountRate}
      isPriceGray={isScheduled}
      onClick={() => onClick?.(item)}
      imageHref={canNavigate ? `/auctions/${item.id}` : undefined}
      badgeNode={<UserItemBadge status={item.status} />}
      actionNode={
        isOwn &&
        !isOnSale &&
        !isSoldOut &&
        !isAuctionEnded && (
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
              variant={hasUnreadMessages ? "primary" : "outline"}
              className="h-9 flex-1 gap-1"
              asChild
            >
              <Link href="/dm" onClick={(e) => e.stopPropagation()}>
                <MessageCircle className="size-4" />
                <span className="text-sm">1:1 채팅</span>

                {hasUnreadMessages && (
                  <span
                    className="text-2.5 ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white/20 px-1 text-white"
                    aria-label={`${hasUnreadMessages}개의 읽지 않은 메시지`}
                  >
                    {hasUnreadMessages}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        )
      }
    />
  );
}
