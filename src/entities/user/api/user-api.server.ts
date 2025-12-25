import { fetch as serverFetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

import { UserBasicInfoResponseType, UserProfileType } from "../model/types";

export async function fetchUserBasicInfoServer(): Promise<UserProfileType> {
  const response = await serverFetch<UserBasicInfoResponseType["data"]>(API_ENDPOINTS.authBasic, {
    method: "GET",
  });

  return {
    name: response.data.username,
    email: response.data.userEmail,
    avatarUrl: response.data.userProfileUrl || undefined,
    rating: 0,
    reviewCount: 0,
  };
}
