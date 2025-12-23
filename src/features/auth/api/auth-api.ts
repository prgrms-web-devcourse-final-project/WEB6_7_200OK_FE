import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

import type { SocialProvider } from "../model/social-maps";

export const fetchSocialLoginUrl = async (provider: SocialProvider): Promise<string> => {
  const response = await httpClient<string>(API_ENDPOINTS.auth, {
    method: "GET",
    queryParams: { provider },
  });

  if (!response.data) {
    throw new Error("로그인 URL을 받아오지 못했습니다. 다시 시도해주세요.");
  }

  return response.data;
};
