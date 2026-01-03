import {
  CalendarDays,
  Package,
  ShoppingBag,
  Heart,
  MessageSquare,
  BellRing,
  Eye,
} from "lucide-react";

import type { TabConfig } from "./types";

export const DASHBOARD_TABS: TabConfig[] = [
  { id: "calendar", label: "캘린더", icon: CalendarDays, isPublic: false },
  { id: "sales", label: "판매 목록", icon: Package, isPublic: true }, // 공개
  { id: "purchases", label: "구매 목록", icon: ShoppingBag, isPublic: false },
  { id: "auctionLike", label: "관심 목록", icon: Heart, isPublic: false },
  { id: "notifications", label: "알림 목록", icon: BellRing, isPublic: false },
  { id: "recent", label: "최근 본 상품", icon: Eye, isPublic: false },
  { id: "reviews", label: "리뷰 목록", icon: MessageSquare, isPublic: true }, // 공개
];
