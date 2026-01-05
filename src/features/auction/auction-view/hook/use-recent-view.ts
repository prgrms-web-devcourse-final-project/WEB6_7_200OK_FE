"use client";

import { useEffect, useRef } from "react";

import { recordRecentView } from "@/features/auction/auction-view/api/recent-view";
import { useIsAuthenticated } from "@/features/auth/api/use-is-authenticated";

export function useRecentView(auctionId: string | number) {
  const user = useIsAuthenticated();
  const callRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (!user) return;

    if (callRef.current === auctionId) return;
    callRef.current = auctionId;

    recordRecentView(auctionId).catch(() => {});
  }, [auctionId, user]);
}
