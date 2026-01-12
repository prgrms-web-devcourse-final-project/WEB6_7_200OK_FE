"use client";

import Link from "next/link";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Bell } from "lucide-react";

import {
  useNotifications,
  useReadAllNotifications,
  useReadNotification,
} from "@/features/notification/api/use-notifications";
import {
  getNotificationIcon,
  getNotificationTargetHref,
} from "@/features/notification/model/notification-mapper";
import { formatAgo } from "@/shared/lib/utils/time/format";
import {
  EmptyState,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Spinner,
} from "@/shared/ui";
import Button from "@/shared/ui/button/button";

export default function HeaderNotificationPopover() {
  const { data, isPending, error } = useNotifications({ page: 0, size: 15 });
  const { mutate: readNotification } = useReadNotification();
  const { mutate: readAllNotifications } = useReadAllNotifications();
  const notifications = data?.slice ?? [];
  const hasUnread = notifications.some((notification) => !notification.readStatus);
  const hasNotifications = notifications.length > 0;

  let markAllControl = (
    <button
      type="button"
      className="text-muted-foreground text-sm font-semibold"
      disabled
      aria-disabled="true"
    >
      모두 읽음
    </button>
  );

  if (hasUnread) {
    markAllControl = (
      <PopoverPrimitive.Close asChild>
        <button
          type="button"
          className="text-brand-text text-sm font-semibold hover:underline"
          onClick={() => {
            readAllNotifications();
          }}
        >
          모두 읽음
        </button>
      </PopoverPrimitive.Close>
    );
  }

  let bodyContent = (
    <EmptyState
      title="알림이 없어요."
      description="새 알림이 도착하면 여기에 표시됩니다."
      className="h-[420px] w-full border-0 bg-transparent p-6 shadow-none"
    />
  );

  if (isPending) {
    bodyContent = (
      <div className="flex h-[420px] items-center justify-center">
        <Spinner className="text-brand-text size-5" aria-label="알림 불러오는 중" />
      </div>
    );
  } else if (error) {
    bodyContent = (
      <EmptyState
        title="알림을 불러오지 못했습니다."
        description="잠시 후 다시 시도해주세요."
        className="h-[420px] w-full border-0 bg-transparent p-6 shadow-none"
      />
    );
  } else if (hasNotifications) {
    bodyContent = (
      <ul className="divide-border divide-y">
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const targetHref = getNotificationTargetHref(notification.target, notification.targetId);

          return (
            <li key={notification.notificationId}>
              <PopoverPrimitive.Close asChild>
                <Link
                  href={targetHref}
                  onClick={() => {
                    if (!notification.readStatus) {
                      readNotification(notification.notificationId);
                    }
                  }}
                  className="hover:bg-brand-surface focus-visible:ring-brand-text/30 flex w-full items-start gap-3 px-4 py-4 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span className="bg-brand-surface text-brand-text flex size-11 items-center justify-center rounded-full">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex-1 space-y-1">
                    <p className="text-foreground text-sm font-semibold">{notification.title}</p>
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
    );
  }

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
          {markAllControl}
        </div>
        <div className="bg-border h-px" />
        <ScrollArea className="h-[420px]">{bodyContent}</ScrollArea>
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
