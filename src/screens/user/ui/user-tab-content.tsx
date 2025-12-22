"use client";

import { type ComponentType, type ReactNode } from "react";

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { DASHBOARD_TABS, type TabIdType } from "@/entities/user";
import { TabLabelHeader } from "@/features/user";
import { Skeleton } from "@/shared/ui";

// 1. 위젯들이 공통으로 받을 Props 인터페이스 정의 (any 대체)
export interface DashboardWidgetProps {
  isOwn?: boolean;
  label?: ReactNode;
}

// 2. Dynamic Import에 제네릭 타입 적용 및 로딩 스켈레톤 추가
// 제네릭을 사용하여 가져오는 컴포넌트가 DashboardWidgetProps를 준수함을 명시
const UserDashboardCalendar = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/user-dashboard-calendar").then((mod) => mod.UserDashboardCalendar),
  {
    loading: () => <Skeleton className="h-[500px] w-full" />,
  }
);

const SalesList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/sale").then((mod) => mod.SalesList),
  {
    loading: () => <Skeleton className="h-40 w-full" />,
  }
);

const PurchaseList = dynamic<DashboardWidgetProps>(() =>
  import("@/widgets/purchase").then((mod) => mod.PurchaseList)
);

const Wishlist = dynamic<DashboardWidgetProps>(() =>
  import("@/widgets/wishlist").then((mod) => mod.Wishlist)
);

const NotificationPreferenceList = dynamic<DashboardWidgetProps>(() =>
  import("@/widgets/notification-preference").then((mod) => mod.NotificationPreferenceList)
);

const RecentViewedList = dynamic<DashboardWidgetProps>(() =>
  import("@/widgets/recent-viewed").then((mod) => mod.RecentViewedList)
);

const ReviewList = dynamic<DashboardWidgetProps>(() =>
  import("@/widgets/review").then((mod) => mod.ReviewList)
);

// 3. WIDGET_MAP에 명시적 타입 지정 (Record<Key, Type>)
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
  const currentTabId = tabId as TabIdType;

  // WIDGET_MAP에 타입이 지정되어 있으므로 WidgetComponent는 안전하게 추론됨
  const WidgetComponent = WIDGET_MAP[currentTabId];
  const currentTabConfig = DASHBOARD_TABS.find((t) => t.id === currentTabId);

  if (!WidgetComponent || !currentTabConfig) {
    notFound();
  }

  const labelIndicator = <TabLabelHeader label={currentTabConfig.label} />;

  return (
    <section className="flex w-full flex-col gap-4">
      {/* Props 전달 시 타입 체크 활성화 */}
      <WidgetComponent label={labelIndicator} isOwn={isOwn} />
    </section>
  );
}
