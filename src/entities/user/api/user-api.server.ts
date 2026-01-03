import { cache } from "react";

import { cookies } from "next/headers";

import { fetch as apiFetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface UserApiResponse {
  username: string;
  email: string;
  profileImage: string | null;
  rating: number;
  totalReviews: number;
  isOwner: boolean;
}

export const getUserProfileServer = cache(async (targetUserId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const path = API_ENDPOINTS.userInfo(targetUserId);

  try {
    const response = await apiFetch<UserApiResponse>(path, {
      method: "GET",
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },

      cache: "no-store",
    });

    const { data } = response;

    if (!data) return null;

    return {
      name: data.username,
      email: data.email,
      avatarUrl: data.profileImage || undefined,
      rating: data.rating,
      reviewCount: data.totalReviews,
      isOwner: data.isOwner,
    };
  } catch {
    return null;
  }
});
