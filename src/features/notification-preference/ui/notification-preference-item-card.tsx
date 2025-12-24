"use client";

import { Settings, BellRing } from "lucide-react";

import { ItemBadge, ItemCard } from "@/entities/item";

import { NotificationPreferenceItemType } from "../../../entities/notification-preference/model/types";

interface NotificationPreferenceItemProps {
  item: NotificationPreferenceItemType;
  onClick?: (item: NotificationPreferenceItemType) => void;
  onSettingClick?: (item: NotificationPreferenceItemType) => void;
}

export function NotificationPreferenceItemCard({
  item,
  onClick,
  onSettingClick,
}: NotificationPreferenceItemProps) {
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
                <span className="text-foreground text-xs">{keyword}</span>
              </div>
            ))}
          </div>
        )
      }
    />
  );
}
