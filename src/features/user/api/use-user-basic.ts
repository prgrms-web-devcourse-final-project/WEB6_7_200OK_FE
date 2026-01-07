"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserBasic } from "@/entities/user";
import { userKeys } from "@/features/user/api/use-my-profile";

async function fetchUserBasic() {
  try {
    return await getUserBasic();
  } catch {
    return null;
  }
}

export function useUserBasic() {
  return useQuery({
    queryKey: userKeys.basic(),
    queryFn: fetchUserBasic,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
