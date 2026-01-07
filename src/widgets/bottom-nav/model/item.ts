import { House, Search, Plus, Bell, User } from "lucide-react";

import type { LucideIcon } from "lucide-react";

export const BOTTOM_NAV_ITEMS = [
  { id: "home", label: "홈", href: "/", icon: House },
  { id: "search", label: "검색", href: "/search", icon: Search },
  { id: "create", label: "등록", href: "/auctions/create", icon: Plus },
  { id: "notification", label: "알림", href: "/notifications", icon: Bell },
  { id: "profile", label: "내정보", href: "/users/me", icon: User },
] as const;

export type BottomNavIdType = (typeof BOTTOM_NAV_ITEMS)[number]["id"];

export interface BottomNavItem {
  id: BottomNavIdType;
  label: string;
  href: string;
  icon: LucideIcon;
}
