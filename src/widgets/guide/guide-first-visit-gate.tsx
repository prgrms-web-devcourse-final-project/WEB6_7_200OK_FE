"use client";

import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { GUIDE_STORAGE_KEY } from "@/screens/guide/model/guide-constants";
import { ROUTES } from "@/shared/config/routes";

export function GuideFirstVisitGate() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === ROUTES.guide) return;
    if (typeof window === "undefined") return;

    const hasSeen = window.localStorage.getItem(GUIDE_STORAGE_KEY) === "true";
    if (hasSeen) return;

    router.replace(ROUTES.guide);
  }, [pathname, router]);

  return null;
}
