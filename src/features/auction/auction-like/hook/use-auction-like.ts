"use client";

import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleAuctionLike } from "@/features/auction/auction-like/api/like";
import type { LikeType } from "@/features/auction/auction-like/model/types";
import { useIsAuthenticated } from "@/features/auth/api/use-is-authenticated";
import {
  getAuctionsCacheSnapshot,
  restoreAuctionsCache,
  updateAuctionsCache,
} from "@/shared/lib/query/update-auctions-cache";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

import { userAuctionLikeKeys } from "../api/use-auction-like"; // users 찜 목록 갱신

interface UseAuctionLikeType {
  auctionId: string | number;
  initIsLiked: boolean;
  initLikeCount?: number;
}

export const useAuctionLike = ({ auctionId, initIsLiked, initLikeCount }: UseAuctionLikeType) => {
  const queryClient = useQueryClient();
  const user = useIsAuthenticated();

  const [state, setState] = useState<LikeType>({
    isLiked: initIsLiked,
    likeCount: initLikeCount ?? 0,
  });

  const queryKey = ["auction-like", auctionId] as const;

  useEffect(() => {
    setState((prev) => {
      const nextLikeCount = initLikeCount ?? prev.likeCount;
      if (prev.isLiked === initIsLiked && prev.likeCount === nextLikeCount) {
        return prev;
      }
      return { isLiked: initIsLiked, likeCount: nextLikeCount };
    });
  }, [initIsLiked, initLikeCount]);

  const likeMutation = useMutation({
    mutationFn: () => toggleAuctionLike(auctionId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const prev = state;
      const snapshot = getAuctionsCacheSnapshot(queryClient);
      const nextIsLiked = !state.isLiked;

      updateAuctionsCache(queryClient, auctionId, { isLiked: nextIsLiked });
      setState((s) => ({
        isLiked: !s.isLiked,
        likeCount: s.likeCount + (s.isLiked ? -1 : 1),
      }));

      return { prev, snapshot };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) setState(ctx.prev);
      restoreAuctionsCache(queryClient, ctx?.snapshot);
      showToast.error("찜 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    },

    onSuccess: (data) => {
      updateAuctionsCache(queryClient, auctionId, { isLiked: data.isLiked });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: userAuctionLikeKeys.all }); // users 찜 목록 갱신
    },
  });

  const toggleLike = () => {
    if (!user) {
      showToast.error("찜을 누르려면 로그인이 필요합니다.");
      return;
    }
    likeMutation.mutate();
  };

  return {
    isLiked: state.isLiked,
    likeCount: state.likeCount,
    toggleLike,
    isPending: likeMutation.isPending,
  };
};
