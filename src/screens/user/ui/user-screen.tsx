"use client";

import { useEffect, useState } from "react";

import { fetchUserBasicInfo, UserProfileType } from "@/entities/user";
import { UserProfileWidget } from "@/widgets/user";

import { UserDashboard } from "./user-dashboard";

export function UserScreen() {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        setIsLoading(true);
        const data = await fetchUserBasicInfo();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  if (isLoading) {
    return (
      <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 2xl:px-0">
        <div className="flex h-32 w-full items-center justify-center">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 2xl:px-0">
        <div className="flex h-32 w-full items-center justify-center">
          <p className="text-destructive">프로필을 불러오는데 실패했습니다.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 2xl:px-0">
      <UserProfileWidget profile={profile} isOwn />
      <UserDashboard isOwn />
    </main>
  );
}

// 목업 my page
// "use client";

// import { MOCK_OWN_PROFILE } from "@/entities/user";
// import { UserProfileWidget } from "@/widgets/user";

// import { UserDashboard } from "./user-dashboard";

// export function UserScreen() {
//   return (
//     <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 2xl:px-0">
//       <UserProfileWidget profile={MOCK_OWN_PROFILE} isOwn />
//       <UserDashboard isOwn />
//     </main>
//   );
// }

// 목업 타인 페이지
// "use client";

// import { MOCK_OTHER_PROFILE } from "@/entities/user";
// import { UserProfileWidget } from "@/widgets/user";

// import { UserDashboard } from "./user-dashboard";

// export function UserScreen() {
//   return (
//     <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 2xl:px-0">
//       <UserProfileWidget profile={MOCK_OTHER_PROFILE} isOwn={false} />
//       <UserDashboard isOwn={false} />
//     </main>
//   );
// }
