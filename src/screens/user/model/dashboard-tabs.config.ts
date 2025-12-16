import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Heart,
  MessageSquare,
  BellRing,
  Eye,
  type LucideIcon,
} from "lucide-react";

export type TabId =
  | "overview"
  | "sales"
  | "purchases"
  | "watchlist"
  | "notifications"
  | "recent"
  | "reviews";

export interface TabConfig {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

export const DASHBOARD_TABS: TabConfig[] = [
  { id: "overview", label: "대시보드", icon: LayoutDashboard },
  { id: "sales", label: "판매 목록", icon: Package },
  { id: "purchases", label: "구매 목록", icon: ShoppingBag },
  { id: "watchlist", label: "관심 목록", icon: Heart },
  { id: "notifications", label: "알림 목록", icon: BellRing },
  { id: "recent", label: "최근 본 상품", icon: Eye },
  { id: "reviews", label: "리뷰 목록", icon: MessageSquare },
];
