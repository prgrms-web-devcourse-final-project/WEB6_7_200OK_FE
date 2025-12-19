import { UserBasicInfoResponse, UserProfile } from "../model/types";

export async function fetchUserBasicInfo(): Promise<UserProfile> {
  const response = await fetch("/api/v1/auth/basic", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user info: ${response.status}`);
  }

  const result: UserBasicInfoResponse = await response.json();

  return {
    name: result.data.username,
    email: result.data.userEmail,
    avatarUrl: result.data.userProfileUrl || undefined,
    rating: 0, // 현재 API에서 제공하지 않으므로 기본값
    reviewCount: 0, // 현재 API에서 제공하지 않으므로 기본값
  };
}
