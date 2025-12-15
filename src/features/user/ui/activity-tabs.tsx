"use client";

import { type LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

export interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ActivityTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  tabs: TabItem[];
}

export function ActivityTabs({ activeTab, onTabChange, tabs }: ActivityTabsProps) {
  return (
    <div className="bg-card border-border flex w-full items-center gap-2 overflow-x-auto rounded-lg border p-1.5 md:flex-nowrap">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Button
            key={tab.id}
            variant={isActive ? "primary" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
            className={cn(
              "h-10 min-w-0 flex-1 shrink-0 gap-1.5 rounded-md px-2 text-sm transition-all",
              isActive
                ? "bg-brand text-brand-contrast hover:bg-brand/90"
                : "text-foreground hover:bg-secondary"
            )}
          >
            <tab.icon
              className={cn(
                "h-4 w-4 shrink-0",
                isActive ? "text-brand-contrast" : "text-foreground"
              )}
            />
            <span className="hidden md:inline">{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
