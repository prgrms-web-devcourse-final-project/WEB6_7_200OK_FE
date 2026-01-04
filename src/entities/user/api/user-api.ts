import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

import { UserProfileType } from "../model/types";

interface UserInfoResponseData {
  isOwner: boolean;
  userId: number;
  username: string;
  email: string;
  profileImage: string;
  totalReviews: number;
  rating: number;
}

export async function getUserProfile(targetUserId: number): Promise<UserProfileType> {
  const result = await httpClient<UserInfoResponseData>(API_ENDPOINTS.userInfo(targetUserId), {
    method: "GET",
  });

  const { data } = result;

  return {
    name: data.username,
    email: data.email,
    avatarUrl: data.profileImage || undefined,
    rating: data.rating,
    reviewCount: data.totalReviews,
    isOwner: data.isOwner,
  };
}

interface UserBasicResponse {
  userEmail: string;
  username: string;
  userProfileUrl: string;
}

export async function getUserBasic(): Promise<UserBasicResponse> {
  const result = await httpClient<UserBasicResponse>(API_ENDPOINTS.authBasic, {
    method: "GET",
  });

  const { data } = result;
  return data;
}
