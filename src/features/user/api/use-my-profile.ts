import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserProfile, updateUserProfileImage, updateUserName } from "@/entities/user";
import type { UserProfileType } from "@/entities/user"; // 타입 위치에 맞게 수정

export const userKeys = {
  profile: (userId: number) => ["user", "profile", userId] as const,
};

export function useUserProfile(userId: number, initialData?: UserProfileType) {
  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
    initialData,
  });
}

export function useUpdateUserImage(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile(userId) });
    },
  });
}

export function useUpdateUserName(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile(userId) });
    },
  });
}
