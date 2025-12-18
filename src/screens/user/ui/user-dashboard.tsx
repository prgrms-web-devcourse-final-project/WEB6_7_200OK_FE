"use client";

import { useState, useMemo, useEffect } from "react";

import { ActivityTabs } from "@/features/user/ui/activity-tabs";
import { TabLabeHeader } from "@/features/user/ui/tab-label-header";
import { NotificationPreferenceList } from "@/widgets/notification-preference";
import { PurchaseList } from "@/widgets/purchase";
import { RecentViewedList } from "@/widgets/recent-viewed";
import { ReviewList } from "@/widgets/review";
import { SalesList } from "@/widgets/sale";
import { Wishlist } from "@/widgets/wishlist";

import { UserDashboardCalendar } from "./user-dashboard-calendar";
import { DASHBOARD_TABS, TabId } from "../model/dashboard-tabs.config";

interface UserDashboardProps {
  isOwn?: boolean;
}

export function UserDashboard({ isOwn = false }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>(isOwn ? "calendar" : "sales");

  const currentTab = useMemo(() => DASHBOARD_TABS.find((t) => t.id === activeTab), [activeTab]);

  const labelIndicator = currentTab ? <TabLabeHeader label={currentTab.label} /> : null;

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
        return <UserDashboardCalendar labelNode={labelIndicator} />;
      case "sales":
        return <SalesList isOwn={isOwn} labelNode={labelIndicator} />;
      case "purchases":
        return <PurchaseList labelNode={labelIndicator} />;
      case "wishlist":
        return <Wishlist labelNode={labelIndicator} />;
      case "notifications":
        return <NotificationPreferenceList labelNode={labelIndicator} />;
      case "recent":
        return <RecentViewedList labelNode={labelIndicator} />;
      case "reviews":
        return <ReviewList labelNode={labelIndicator} />;
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
