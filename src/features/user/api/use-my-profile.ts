// features/user/api/use-my-profile.ts
import { useQuery } from "@tanstack/react-query";

import { fetchUserBasicInfo } from "@/entities/user/api/user-api";
import { ApiError } from "@/shared/api/client";

export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
};

export function useMyProfile() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: fetchUserBasicInfo,
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 30, // 30분간 캐시 유지
    retry: (failureCount, error) => {
      // 401, 403 에러(인증/권한 실패)는 재시도하지 않음
      if (error instanceof ApiError && (error.code === 401 || error.code === 403)) {
        return false;
      }
      // 404 에러(리소스 없음)도 재시도 불필요
      if (error instanceof ApiError && error.code === 404) {
        return false;
      }
      // 최대 2번까지 재시도 (주로 네트워크 에러나 5xx 에러)
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    throwOnError: false, // 에러를 throw하지 않고 error 상태로 반환
  });
}
