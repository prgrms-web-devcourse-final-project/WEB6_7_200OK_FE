"use client";

import { useParams } from "next/navigation";

import { DASHBOARD_TABS, UserProfileType } from "@/entities/user";
import { ActivityTabs, UserProfileCard } from "@/features/user";
import { useUserProfile } from "@/features/user/api/use-my-profile";

interface UserDashboardHeaderProps {
  targetUserId: number;
  initialData?: UserProfileType; // initial user profile data used before fetching
}

export function UserDashboardHeader({ targetUserId, initialData }: UserDashboardHeaderProps) {
  const params = useParams();
  const activeTab = (params.tab as string) || "calendar";

  const { data: profile, isLoading } = useUserProfile(targetUserId, initialData);

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
      <UserProfileCard userId={targetUserId} />
      <ActivityTabs
        activeTab={activeTab}
        tabs={visibleTabs}
        userId={targetUserId}
        isOwner={isOwner}
      />
    </>
  );
}
