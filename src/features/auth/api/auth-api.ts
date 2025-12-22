import { fetchClient, ApiError } from "@/shared/api/client";

import { SocialProvider } from "../model/social-maps";

export async function getSocialLoginUrl(provider: SocialProvider): Promise<string> {
  try {
    const response = await fetchClient<string>(`/api/v1/auth?provider=${provider}`, {
      method: "GET",
    });

    if (!response.data || typeof response.data !== "string") {
      throw new Error("로그인 URL을 받아오지 못했습니다.");
    }

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.code >= 500) {
        throw new Error("서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else if (error.code === 404) {
        throw new Error("로그인 서비스를 찾을 수 없습니다.");
      } else if (error.code === 401 || error.code === 403) {
        throw new Error("로그인 권한이 없습니다.");
      }
      throw new Error(error.message || "로그인 요청 중 문제가 발생했습니다.");
    }
    throw error;
  }
}
