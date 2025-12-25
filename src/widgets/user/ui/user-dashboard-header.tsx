"use client";

import { useRouter, useParams } from "next/navigation";

import { DASHBOARD_TABS } from "@/entities/user";
import { ActivityTabs, UserProfileCard } from "@/features/user";
import { useMyProfile } from "@/features/user/api/use-my-profile";
import { ApiError } from "@/shared/api/client";

export function UserDashboardHeader() {
  const router = useRouter();
  const params = useParams();
  const activeTab = (params.tab as string) || "calendar";

  const { data: profile, isLoading, error } = useMyProfile();
  const isOwn = true;

  const visibleTabs = isOwn
    ? DASHBOARD_TABS
    : DASHBOARD_TABS.filter((tab) => ["sales", "reviews"].includes(tab.id));

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
        <p className="mt-2 text-sm text-gray-600">프로필 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    const errorMessage = error instanceof ApiError ? error.message : "프로필을 불러올 수 없습니다.";
    const isAuthError = error instanceof ApiError && (error.code === 401 || error.code === 403);

    return (
      <div className="py-20 text-center">
        <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-red-900">
            {isAuthError ? "로그인이 필요합니다" : "오류 발생"}
          </h3>
          <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
          {isAuthError && (
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              로그인하기
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!profile) {
    return <div className="py-20 text-center text-gray-500">프로필 정보가 없습니다.</div>;
  }

  return (
    <>
      <UserProfileCard profile={profile} isOwn={isOwn} />
      <ActivityTabs activeTab={activeTab} tabs={visibleTabs} />
    </>
  );
}
