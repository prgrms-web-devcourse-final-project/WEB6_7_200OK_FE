"use client";

import { type ComponentType, type ReactNode } from "react";

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { DASHBOARD_TABS, type TabIdType } from "@/entities/user";
import { TabLabelHeader } from "@/features/user";
import { useUserProfile } from "@/features/user/api/use-my-profile";
import { CommonItemTabSkeleton, ReviewTabSkeleton, CalendarTabSkeleton } from "@/widgets/user";

export interface DashboardWidgetProps {
  isOwn: boolean;
  label: ReactNode;
  userId: number;
}

const UserDashboardCalendar = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/user-dashboard-calendar").then((mod) => mod.UserDashboardCalendar),
  { loading: () => <CalendarTabSkeleton /> }
);

const SalesList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/sale").then((mod) => mod.UserSalesList),
  { loading: () => <CommonItemTabSkeleton /> }
);

const PurchaseList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/purchase").then((mod) => mod.UserPurchaseList),
  { loading: () => <CommonItemTabSkeleton /> }
);

const AuctionLike = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/auction/auction-like").then((mod) => mod.UserAuctionLikeList),
  { loading: () => <CommonItemTabSkeleton /> }
);

const NotificationPreferenceList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/notification-preference").then((mod) => mod.NotificationPreferenceList),
  { loading: () => <CommonItemTabSkeleton /> }
);

const RecentViewedList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/recent-viewed").then((mod) => mod.UserRecentViewedList),
  { loading: () => <CommonItemTabSkeleton /> }
);

const ReviewList = dynamic<DashboardWidgetProps>(
  () => import("@/widgets/review").then((mod) => mod.ReviewList),
  { loading: () => <ReviewTabSkeleton /> }
);

const WIDGET_MAP: Record<TabIdType, ComponentType<DashboardWidgetProps>> = {
  calendar: UserDashboardCalendar,
  sales: SalesList,
  purchases: PurchaseList,
  auctionLike: AuctionLike,
  notifications: NotificationPreferenceList,
  recent: RecentViewedList,
  reviews: ReviewList,
};

function isValidTabId(id: string): id is TabIdType {
  return id in WIDGET_MAP;
}

interface UserTabContentProps {
  tabId: string;
  targetUserId: number;
}

export function UserTabContent({ tabId, targetUserId }: UserTabContentProps) {
  if (!isValidTabId(tabId)) notFound();

  const currentTabId = tabId;
  const WidgetComponent = WIDGET_MAP[currentTabId];

  const currentTabConfig = DASHBOARD_TABS.find((t) => t.id === currentTabId);
  if (!currentTabConfig) notFound();

  const { data: profile, isLoading, isFetching, isPending } = useUserProfile(targetUserId);

  // 핵심: 프로필/권한이 "확정"되기 전에는 비공개 판정을 하지 말고
  // 서버/클라 동일하게 스켈레톤을 렌더해서 트리를 고정한다.
  if (isLoading || isFetching || isPending || !profile) {
    return (
      <section className="flex w-full flex-col gap-4">
        {/* 탭별로 다르게 주고 싶으면 currentTabId로 switch */}
        <CommonItemTabSkeleton />
      </section>
    );
  }

  const isOwner = profile.isOwner ?? false;
  const isPublicTab = currentTabConfig.isPublic ?? false;

  if (!isOwner && !isPublicTab) {
    return <div className="py-10 text-center text-gray-500">비공개 페이지입니다.</div>;
  }

  const labelIndicator = <TabLabelHeader label={currentTabConfig.label} />;

  return (
    <section className="flex w-full flex-col gap-4">
      <WidgetComponent label={labelIndicator} isOwn={isOwner} userId={targetUserId} />
    </section>
  );
}
