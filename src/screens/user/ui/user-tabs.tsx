"use client";

import {
  FileText,
  ShoppingBag,
  Heart,
  MessageSquare,
  BellRing,
  Eye,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { id: "sales", label: "판매 목록", icon: FileText },
  { id: "purchases", label: "구매 목록", icon: ShoppingBag },
  { id: "watchlist", label: "관심 목록", icon: Heart },
  { id: "notifications", label: "알림 목록", icon: BellRing },
  { id: "recent", label: "최근 본 상품", icon: Eye },
  { id: "reviews", label: "리뷰 목록", icon: MessageSquare },
];

interface UserTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function UserTabs({ activeTab, onTabChange }: UserTabsProps) {
  return (
    <div className="bg-card border-border flex w-full flex-wrap items-center gap-2 overflow-x-auto rounded-lg border p-1.5 md:flex-nowrap">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Button
            key={tab.id}
            variant={isActive ? "default" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "h-[38px] min-w-[120px] flex-1 shrink-0 gap-1.5 rounded-md text-sm font-medium transition-all",
              isActive
                ? "bg-brand text-brand-contrast hover:bg-brand/90"
                : "text-foreground hover:bg-secondary"
            )}
          >
            <tab.icon
              className={cn("h-4 w-4", isActive ? "text-brand-contrast" : "text-foreground")}
            />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
