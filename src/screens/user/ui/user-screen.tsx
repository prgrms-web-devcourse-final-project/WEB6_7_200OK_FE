"use client";

import { MOCK_OWN_PROFILE } from "@/entities/user/api/mocks";
// import { MOCK_OTHER_PROFILE } from "@/entities/user/api/mocks";
import { UserProfileWidget } from "@/widgets/user/ui/user-profile-widget";

import { UserDashboard } from "./user-dashboard";

export function UserScreen() {
  return (
    <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 2xl:px-0">
      <UserProfileWidget profile={MOCK_OWN_PROFILE} isOwn />
      {/* <UserProfileWidget profile={MOCK_OTHER_PROFILE} isOwn={false} /> */}
      <UserDashboard isOwn />
      {/* <UserDashboard isOwn={false} /> */}
    </main>
  );
}
