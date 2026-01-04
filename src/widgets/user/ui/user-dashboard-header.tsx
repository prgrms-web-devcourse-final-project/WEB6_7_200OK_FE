"use client";

import { useParams } from "next/navigation";

import { DASHBOARD_TABS } from "@/entities/user";
import { ActivityTabs, UserProfileCard } from "@/features/user";
import { useUserProfile } from "@/features/user/api/use-my-profile";

export function UserDashboardHeader({ targetUserId }: { targetUserId: number }) {
  const params = useParams();
  const activeTab = (params.tab as string) || "calendar";

  const { data: profile, isLoading } = useUserProfile(targetUserId);
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4" data-testid="user-dashboard-header-skeleton">
        <div className="bg-muted h-40 w-full animate-pulse rounded-md" />
        <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
      </div>
    );
  }

  if (!profile) return null;

  const { isOwner } = profile;

  const visibleTabs = isOwner ? DASHBOARD_TABS : DASHBOARD_TABS.filter((tab) => tab.isPublic);

  return (
    <>
      <UserProfileCard profile={profile} isOwn={isOwner} />
      <ActivityTabs
        activeTab={activeTab}
        tabs={visibleTabs}
        userId={targetUserId}
        isOwner={isOwner}
      />
    </>
  );
}
