import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserProfile, updateUserProfileImage, updateUserName } from "@/entities/user";
import type { UserProfileType } from "@/entities/user";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

export const userKeys = {
  all: ["user"] as const,
  basic: () => [...userKeys.all, "basic"] as const,
  profile: (userId: number) => [...userKeys.all, "profile", userId] as const,
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
      showToast.success("프로필 이미지가 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: userKeys.profile(userId) });
    },
    onError: () => {
      showToast.error("프로필 이미지 변경에 실패했습니다. 다시 시도해주세요.");
    },
  });
}

export function useUpdateUserName(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      showToast.success("이름이 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: userKeys.profile(userId) });
    },
    onError: () => {
      showToast.error("이름 변경에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
