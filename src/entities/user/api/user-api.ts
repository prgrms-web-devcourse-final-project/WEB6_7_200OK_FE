import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

import { UserBasicInfoResponseType, UserProfileType } from "../model/types";

export async function fetchUserBasicInfo(): Promise<UserProfileType> {
  const result = await httpClient<UserBasicInfoResponseType["data"]>(API_ENDPOINTS.authBasic, {
    method: "GET",
  });

  return {
    name: result.data.username,
    email: result.data.userEmail,
    avatarUrl: result.data.userProfileUrl || undefined,
    rating: 0, // API 제공 안함, 기본값
    reviewCount: 0, // API 제공 안함, 기본값
  };
}
