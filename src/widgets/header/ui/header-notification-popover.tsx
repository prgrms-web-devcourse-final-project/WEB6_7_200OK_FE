"use client";

import Link from "next/link";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Bell } from "lucide-react";

import { useNotifications } from "@/features/notification/api/use-notifications";
import {
  getNotificationIcon,
  getNotificationTargetHref,
} from "@/features/notification/model/notification-mapper";
import { formatAgo } from "@/shared/lib/utils/time/format";
import { Popover, PopoverContent, PopoverTrigger, ScrollArea } from "@/shared/ui";
import Button from "@/shared/ui/button/button";

export default function HeaderNotificationPopover() {
  const { data } = useNotifications({ page: 0, size: 15 });
  const notifications = data?.slice ?? [];

  console.log(notifications);
  const hasUnread = notifications.some((notification) => !notification.readStatus);

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
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const targetHref = getNotificationTargetHref(
                notification.target,
                notification.targetId
              );

              return (
                <li key={notification.notificationId}>
                  <PopoverPrimitive.Close asChild>
                    <Link
                      href={targetHref}
                      className="hover:bg-brand-surface focus-visible:ring-brand-text/30 flex w-full items-start gap-3 px-4 py-4 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <span className="bg-brand-surface text-brand-text flex size-11 items-center justify-center rounded-full">
                        <Icon className="size-5" />
                      </span>
                      <div className="flex-1 space-y-1">
                        <p className="text-foreground text-sm font-semibold">
                          {notification.title}
                        </p>
                        <p className="text-muted-foreground text-sm">{notification.message}</p>
                        <p className="text-muted-foreground pt-1 text-xs">
                          {formatAgo(notification.notificationAt)}
                        </p>
                      </div>
                      {!notification.readStatus ? (
                        <span className="bg-brand-text mt-1 size-2 rounded-full" aria-hidden />
                      ) : null}
                    </Link>
                  </PopoverPrimitive.Close>
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
