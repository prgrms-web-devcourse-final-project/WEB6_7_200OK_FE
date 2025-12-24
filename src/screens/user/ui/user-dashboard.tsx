"use client";

import { useState, useMemo, useEffect } from "react";

import { ActivityTabs, TabLabelHeader } from "@/features/user";
import { NotificationPreferenceList } from "@/widgets/notification-preference";
import { PurchaseList } from "@/widgets/purchase";
import { RecentViewedList } from "@/widgets/recent-viewed";
import { ReviewList } from "@/widgets/review";
import { SalesList } from "@/widgets/sale";
import { UserDashboardCalendar } from "@/widgets/user-dashboard-calendar";
import { Wishlist } from "@/widgets/wishlist";

import { DASHBOARD_TABS, TabIdType } from "../../../entities/user/model/dashboard-tabs.config";

interface UserDashboardProps {
  isOwn?: boolean;
}

export function UserDashboard({ isOwn = false }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabIdType>(isOwn ? "calendar" : "sales");

  const currentTab = useMemo(() => DASHBOARD_TABS.find((t) => t.id === activeTab), [activeTab]);

  const labelIndicator = currentTab ? <TabLabelHeader label={currentTab.label} /> : null;

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
      case "calendar":
        return <UserDashboardCalendar label={labelIndicator} />;
      case "sales":
        return <SalesList isOwn={isOwn} label={labelIndicator} />;
      case "purchases":
        return <PurchaseList label={labelIndicator} />;
      case "wishlist":
        return <Wishlist label={labelIndicator} />;
      case "notifications":
        return <NotificationPreferenceList label={labelIndicator} />;
      case "recent":
        return <RecentViewedList label={labelIndicator} />;
      case "reviews":
        return <ReviewList label={labelIndicator} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ActivityTabs
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as TabIdType)}
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
