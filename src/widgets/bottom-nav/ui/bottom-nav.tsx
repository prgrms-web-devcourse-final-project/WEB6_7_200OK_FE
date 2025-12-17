"use client";

import { usePathname } from "next/navigation";

import { BOTTOM_NAV_ITEMS, BottomNavIdType } from "@/widgets/bottom-nav/model/item";
import { BottomNavItem } from "@/widgets/bottom-nav/ui/bottom-nav-item";

export function BottomNav() {
  const pathname = usePathname();

  // TODO: 알림 연결 후 하드 코딩 삭제
  const hasNotificationsById: Partial<Record<BottomNavIdType, boolean>> = {
    notification: true,
  };

  return (
    <nav
      className="bg-background h-header sticky bottom-0 z-50 border-t pt-1.5 md:hidden"
      aria-label="하단 내비게이션"
    >
      <ul className="flex justify-around">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <BottomNavItem
            key={item.id}
            {...item}
            isActive={pathname === item.href}
            hasNotification={!!hasNotificationsById[item.id]}
          />
        ))}
      </ul>
    </nav>
  );
}
