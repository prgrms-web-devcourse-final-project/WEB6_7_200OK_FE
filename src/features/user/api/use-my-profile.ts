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
    staleTime: Infinity,
    gcTime: Infinity,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && (error.code === 401 || error.code === 403)) {
        return false;
      }
      if (error instanceof ApiError && error.code === 404) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    throwOnError: false,
  });
}
