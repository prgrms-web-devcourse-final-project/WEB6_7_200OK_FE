import Link from "next/link";

import { TabConfig } from "@/entities/user";
import { Button } from "@/shared/ui";

interface ActivityTabsProps {
  activeTab: string;
  tabs: TabConfig[];
  userId: number;
  isOwner: boolean;
}

export function ActivityTabs({ activeTab, tabs, userId, isOwner }: ActivityTabsProps) {
  return (
    <div className="bg-card border-border flex w-full items-center gap-2 rounded-lg border p-1.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const hrefPath = isOwner ? `/users/me/${tab.id}` : `/users/${userId}/${tab.id}`;
        return (
          <Button
            key={tab.id}
            variant={isActive ? "primary" : "ghost"}
            asChild
            className="h-10 min-w-0 flex-1 shrink-0 gap-1.5 rounded-md px-2 text-sm"
          >
            <Link href={hrefPath} aria-label={tab.label}>
              <tab.icon className="size-4 shrink-0" />
              <span className="hidden md:inline">{tab.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
