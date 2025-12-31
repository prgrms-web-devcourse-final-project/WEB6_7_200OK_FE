import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "@/entities/user/api/user-api";

export const userKeys = {
  profile: (userId: number) => ["user", "profile", userId] as const,
};

export function useUserProfile(userId: number) {
  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 1,
  });
}
