import {
  CalendarDays,
  Package,
  ShoppingBag,
  Heart,
  MessageSquare,
  BellRing,
  Eye,
  type LucideIcon,
} from "lucide-react";

export type TabIdType =
  | "calendar"
  | "sales"
  | "purchases"
  | "wishlist"
  | "notifications"
  | "recent"
  | "reviews";

export interface TabConfig {
  id: TabIdType;
  label: string;
  icon: LucideIcon;
}

export const DASHBOARD_TABS: TabConfig[] = [
  { id: "calendar", label: "캘린더", icon: CalendarDays },
  { id: "sales", label: "판매 목록", icon: Package },
  { id: "purchases", label: "구매 목록", icon: ShoppingBag },
  { id: "wishlist", label: "관심 목록", icon: Heart },
  { id: "notifications", label: "알림 목록", icon: BellRing },
  { id: "recent", label: "최근 본 상품", icon: Eye },
  { id: "reviews", label: "리뷰 목록", icon: MessageSquare },
];
