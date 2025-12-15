import Link from "next/link";

import { cn } from "@/shared/lib/utils/utils";
import type { BottomNavItem } from "@/widgets/bottom-nav/model/item";

export interface BottomNavItemProps extends BottomNavItem {
  isActive: boolean;
  hasNotification?: boolean;
}

export function BottomNavItem({
  href,
  label,
  icon: Icon,
  isActive,
  hasNotification,
}: BottomNavItemProps) {
  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className="relative flex w-13 flex-col items-center gap-1"
      >
        <Icon size={24} className={cn(isActive && "text-brand")} />
        <span className={cn("text-sm", isActive && "text-brand")}>{label}</span>

        {hasNotification && (
          <span className="absolute top-0 right-2 h-2 w-2 rounded-full bg-red-500" aria-hidden />
        )}
      </Link>
    </li>
  );
}
