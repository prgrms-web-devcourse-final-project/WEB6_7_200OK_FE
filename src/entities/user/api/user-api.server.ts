import { fetch as serverFetch } from "@/shared/api/server";

import { UserBasicInfoResponseType, UserProfileType } from "../model/types";

export async function fetchUserBasicInfoServer(): Promise<UserProfileType> {
  const response = await serverFetch<UserBasicInfoResponseType["data"]>("/api/v1/auth/basic", {
    method: "GET",
  });

  if (response.code !== 200 || !response.data) {
    throw new Error("사용자 정보를 불러올 수 없습니다.");
  }

  return {
    name: response.data.username,
    email: response.data.userEmail,
    avatarUrl: response.data.userProfileUrl || undefined,
    rating: 0,
    reviewCount: 0,
  };
}
