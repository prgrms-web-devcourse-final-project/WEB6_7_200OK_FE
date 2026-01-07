"use client";

import Link from "next/link";

import { MessageCircle, Check, Star } from "lucide-react";

import { UserItemBadge, UserItemCard, UserPurchaseItemType } from "@/entities/auction";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui";

interface UserPurchasedItemCardProps {
  item: UserPurchaseItemType;
  onReviewClick?: (item: UserPurchaseItemType) => void;
  onConfirm?: (item: UserPurchaseItemType) => void;
}

export function UserPurchasedItemCard({
  item,
  onReviewClick,
  onConfirm,
}: UserPurchasedItemCardProps) {
  const isConfirmed = item.status === "구매 확정";
  const hasUnreadMessages = item.unreadMessageCount ? item.unreadMessageCount > 0 : false;

  return (
    <UserItemCard
      name={item.name}
      imageUrl={item.imageUrl}
      date={item.date}
      price={item.price}
      originalPrice={item.originalPrice}
      discountRate={item.discountRate}
      isPriceGray={!isConfirmed}
      imageHref={ROUTES.auctionDetail(item.id)}
      badgeNode={<UserItemBadge status={item.status} />}
      footerNode={
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
                  aria-label={`${item.unreadMessageCount}개의 읽지 않은 메시지`}
                  role="status"
                >
                  {item.unreadMessageCount}
                </span>
              )}
            </Link>
          </Button>

          {isConfirmed ? (
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
          ) : (
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
          )}
        </div>
      }
    />
  );
}
