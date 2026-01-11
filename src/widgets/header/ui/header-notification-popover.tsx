"use client";

import Link from "next/link";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Bell, Clock, Gavel, MessageCircle, TrendingUp } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger, ScrollArea } from "@/shared/ui";
import Button from "@/shared/ui/button/button";

const notificationTemplates = [
  {
    title: "아이폰 14 프로 경매 종료 임박!",
    message: "5분 후 경매가 종료됩니다.",
    icon: TrendingUp,
  },
  {
    title: "입찰 성공",
    message: "삼성 노트북 경매에서 최고가를 기록중입니다.",
    icon: Gavel,
  },
  {
    title: "새로운 메시지",
    message: "판매자가 메시지를 보냈습니다.",
    icon: MessageCircle,
  },
  {
    title: "경매 시작",
    message: "관심 물품의 경매가 시작되었습니다.",
    icon: Clock,
  },
];

const timeLabels = ["5분 전", "15분 전", "1시간 전", "2시간 전", "3시간 전"];

const notifications = Array.from({ length: 15 }, (_, index) => {
  const template = notificationTemplates[index % notificationTemplates.length];

  return {
    id: `notification-${index + 1}`,
    isUnread: index < 4,
    time: timeLabels[index % timeLabels.length],
    ...template,
  };
});

export default function HeaderNotificationPopover() {
  const hasUnread = notifications.some((notification) => notification.isUnread);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="알림" size="icon-lg" variant="ghost" className="relative">
          <Bell className="size-5" />
          {hasUnread ? (
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-[360px] p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-base font-semibold">알림</h2>
          <PopoverPrimitive.Close asChild>
            <button type="button" className="text-brand-text text-sm font-semibold hover:underline">
              모두 읽음
            </button>
          </PopoverPrimitive.Close>
        </div>
        <div className="bg-border h-px" />
        <ScrollArea className="h-[420px]">
          <ul className="divide-border divide-y">
            {notifications.slice(0, 15).map((notification) => {
              const Icon = notification.icon;

              return (
                <li key={notification.id}>
                  <button
                    type="button"
                    className="hover:bg-brand-surface focus-visible:ring-brand-text/30 flex w-full items-start gap-3 px-4 py-4 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <span className="bg-brand-surface text-brand-text flex size-11 items-center justify-center rounded-full">
                      <Icon className="size-5" />
                    </span>
                    <div className="flex-1 space-y-1">
                      <p className="text-foreground text-sm font-semibold">{notification.title}</p>
                      <p className="text-muted-foreground text-sm">{notification.message}</p>
                      <p className="text-muted-foreground pt-1 text-xs">{notification.time}</p>
                    </div>
                    {notification.isUnread ? (
                      <span className="bg-brand-text mt-1 size-2 rounded-full" aria-hidden />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
        <div className="border-border border-t px-4 py-3">
          <PopoverPrimitive.Close asChild>
            <Link
              href="/users/me/notifications"
              className="text-brand-text block text-center text-sm font-semibold hover:underline"
            >
              내 알림 보기
            </Link>
          </PopoverPrimitive.Close>
        </div>
      </PopoverContent>
    </Popover>
  );
}
