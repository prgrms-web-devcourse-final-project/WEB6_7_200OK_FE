import { House, Search, Plus, MessageCircle, User } from "lucide-react";

import { ROUTES } from "@/shared/config/routes";

import type { LucideIcon } from "lucide-react";

export const BOTTOM_NAV_ITEMS = [
  { id: "home", label: "홈", href: "/", icon: House },
  { id: "search", label: "검색", href: "/search", icon: Search },
  { id: "create", label: "등록", href: ROUTES.auctionCreate, icon: Plus },
  { id: "chat", label: "채팅", href: "/dm", icon: MessageCircle },
  { id: "mypage", label: "내정보", href: ROUTES.myPage, icon: User },
] as const;

export type BottomNavIdType = (typeof BOTTOM_NAV_ITEMS)[number]["id"];

export interface BottomNavItem {
  id: BottomNavIdType;
  label: string;
  href: string;
  icon: LucideIcon;
}
