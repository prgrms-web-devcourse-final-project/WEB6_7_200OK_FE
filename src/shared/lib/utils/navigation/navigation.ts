"use client";

import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  return {
    navigateToPrev: () => router.back(),
    navigateToHome: () => router.push("/"),
  };
};
