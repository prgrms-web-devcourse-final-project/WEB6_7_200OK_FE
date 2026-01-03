"use client";

import { useParams } from "next/navigation";

import { DASHBOARD_TABS } from "@/entities/user";
import { ActivityTabs, UserProfileCard } from "@/features/user";
import { useUserProfile } from "@/features/user/api/use-my-profile";

export function UserDashboardHeader({ targetUserId }: { targetUserId: number }) {
  const params = useParams();
  const activeTab = (params.tab as string) || "calendar";

  const { data: profile } = useUserProfile(targetUserId);

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
