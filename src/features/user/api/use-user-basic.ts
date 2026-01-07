"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserBasic } from "@/entities/user";

const userBasicKey = ["user", "basic"] as const;

async function fetchUserBasic() {
  try {
    return await getUserBasic();
  } catch {
    return null;
  }
}

export function useUserBasic() {
  return useQuery({
    queryKey: userBasicKey,
    queryFn: fetchUserBasic,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
