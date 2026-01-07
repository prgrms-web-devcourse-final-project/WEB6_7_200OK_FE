"use client";

import { useEffect, useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { recordRecentView } from "@/features/auction/auction-view/api/recent-view";
import { useIsAuthenticated } from "@/features/auth/api/use-is-authenticated";
import { userRecentViewedKeys } from "@/features/recent-viewed/api/use-recent-viewed";

export function useRecentView(auctionId: string | number) {
  const user = useIsAuthenticated();
  const queryClient = useQueryClient();
  const callRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (!user) return;

    if (callRef.current === auctionId) return;
    callRef.current = auctionId;

    const updateRecentView = async () => {
      await recordRecentView(auctionId);
      queryClient.invalidateQueries({ queryKey: userRecentViewedKeys.all });
    };

    updateRecentView();
  }, [auctionId, user, queryClient]);
}
