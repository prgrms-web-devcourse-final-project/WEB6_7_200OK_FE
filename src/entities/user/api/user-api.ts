import { UserBasicInfoResponseType, UserProfileType } from "../model/types";

export async function fetchUserBasicInfo(): Promise<UserProfileType> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiBaseUrl}/api/v1/auth/basic`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user info: ${response.status}`);
  }

  const result: UserBasicInfoResponseType = await response.json();

  return {
    name: result.data.username,
    email: result.data.userEmail,
    avatarUrl: result.data.userProfileUrl || undefined,
    rating: 0, // 현재 API에서 제공하지 않으므로 기본값
    reviewCount: 0, // 현재 API에서 제공하지 않으므로 기본값
  };
}
