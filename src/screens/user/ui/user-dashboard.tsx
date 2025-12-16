"use client";

import { useState, useMemo, useEffect } from "react";

import { ActivityTabs } from "@/features/user/ui/activity-tabs";
import { NotificationPreferenceList } from "@/widgets/notification-preference";
import { PurchaseList } from "@/widgets/purchase";
import { RecentViewedList } from "@/widgets/recent-viewed";
import { ReviewList } from "@/widgets/review";
import { SalesList } from "@/widgets/sales";
import { Wishlist } from "@/widgets/wishlist";

import { UserDashboardOverview } from "./user-dashboard-overview";
import { DASHBOARD_TABS, TabId } from "../model/dashboard-tabs.config";

interface UserDashboardProps {
  isOwn?: boolean;
}

export function UserDashboard({ isOwn = false }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>(isOwn ? "overview" : "sales");

  const visibleTabs = useMemo(() => {
    if (isOwn) return DASHBOARD_TABS;
    return DASHBOARD_TABS.filter((tab) => ["sales", "reviews"].includes(tab.id));
  }, [isOwn]);

  useEffect(() => {
    const isCurrentTabVisible = visibleTabs.some((t) => t.id === activeTab);
    if (!isCurrentTabVisible && visibleTabs.length > 0) {
      setActiveTab(visibleTabs[0].id);
    }
  }, [isOwn, visibleTabs, activeTab]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "overview":
        return <UserDashboardOverview />;
      case "sales":
        return <SalesList isOwn={isOwn} />;
      case "purchases":
        return <PurchaseList />;
      case "watchlist":
        return <Wishlist />;
      case "notifications":
        return <NotificationPreferenceList />;
      case "recent":
        return <RecentViewedList />;
      case "reviews":
        return <ReviewList />;
      default:
        return null;
    }
  };

  return (
    <>
      <ActivityTabs
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as TabId)}
        tabs={visibleTabs}
      />

      <section className="flex w-full flex-col gap-4">
        {renderActiveComponent() || (
          <div className="border-border text-muted-foreground flex h-60 w-full items-center justify-center rounded-lg border border-dashed">
            준비 중인 기능입니다.
          </div>
        )}
      </section>
    </>
  );
}
