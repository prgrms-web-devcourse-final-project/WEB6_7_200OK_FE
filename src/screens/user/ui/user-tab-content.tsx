"use client";

import { type ComponentType, type ReactNode } from "react";

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { DASHBOARD_TABS, type TabIdType } from "@/entities/user";
import { TabLabelHeader } from "@/features/user";
import { Skeleton } from "@/shared/ui";

// 위젯 props 타입 정의
export interface DashboardWidgetProps {
  isOwn?: boolean;
  label?: ReactNode;
}

// 위젯 동적 임포트 (Code Splitting & Loading 처리)
const UserDashboardCalendar = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/user-dashboard-calendar").then((mod) => mod.UserDashboardCalendar),
  { loading: () => <Skeleton className="h-[500px] w-full rounded-xl" /> }
);

const SalesList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/sale").then((mod) => mod.SalesList),
  { loading: () => <Skeleton className="h-40 w-full rounded-xl" /> }
);

const PurchaseList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/purchase").then((mod) => mod.PurchaseList),
  { loading: () => <Skeleton className="h-40 w-full rounded-xl" /> }
);

const Wishlist = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/wishlist").then((mod) => mod.Wishlist),
  { loading: () => <Skeleton className="h-40 w-full rounded-xl" /> }
);

const NotificationPreferenceList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/notification-preference").then((mod) => mod.NotificationPreferenceList),
  { loading: () => <Skeleton className="h-24 w-full rounded-xl" /> }
);

const RecentViewedList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/recent-viewed").then((mod) => mod.RecentViewedList),
  { loading: () => <Skeleton className="h-40 w-full rounded-xl" /> }
);

const ReviewList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/review").then((mod) => mod.ReviewList),
  { loading: () => <Skeleton className="h-32 w-full rounded-xl" /> }
);

// 탭 ID와 위젯 매핑
const WIDGET_MAP: Record<TabIdType, ComponentType<DashboardWidgetProps>> = {
  calendar: UserDashboardCalendar,
  sales: SalesList,
  purchases: PurchaseList,
  wishlist: Wishlist,
  notifications: NotificationPreferenceList,
  recent: RecentViewedList,
  reviews: ReviewList,
};

interface UserTabContentProps {
  tabId: string;
  isOwn?: boolean;
}

export function UserTabContent({ tabId, isOwn = true }: UserTabContentProps) {
  // 유효한 탭인지 확인
  const currentTabId = tabId as TabIdType;
  const WidgetComponent = WIDGET_MAP[currentTabId];
  const currentTabConfig = DASHBOARD_TABS.find((t) => t.id === currentTabId);

  // 정의되지 않은 탭이면 404
  if (!WidgetComponent || !currentTabConfig) {
    notFound();
  }

  // 모바일/데스크톱 공용 헤더 라벨
  const labelIndicator = <TabLabelHeader label={currentTabConfig.label} />;

  return (
    <section className="flex w-full flex-col gap-4">
      <WidgetComponent label={labelIndicator} isOwn={isOwn} />
    </section>
  );
}
