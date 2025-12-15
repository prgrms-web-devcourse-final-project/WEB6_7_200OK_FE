"use client";

import { type LucideIcon } from "lucide-react";

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
    <div className="bg-card border-border flex w-full items-center gap-2 rounded-lg border p-1.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Button
            key={tab.id}
            variant={isActive ? "primary" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
            className="h-10 min-w-0 flex-1 shrink-0 gap-1.5 rounded-md px-2 text-sm"
          >
            <tab.icon className="size-4 shrink-0" />
            <span className="hidden md:inline">{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
