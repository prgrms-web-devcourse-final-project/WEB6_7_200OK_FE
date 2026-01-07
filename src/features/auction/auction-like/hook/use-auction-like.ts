"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleAuctionLike } from "@/features/auction/auction-like/api/like";
import type { LikeType } from "@/features/auction/auction-like/model/types";
import { useIsAuthenticated } from "@/features/auth/api/use-is-authenticated";
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

  const likeMutation = useMutation({
    mutationFn: () => toggleAuctionLike(auctionId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const prev = state;
      setState((s) => ({
        isLiked: !s.isLiked,
        likeCount: s.likeCount + (s.isLiked ? -1 : 1),
      }));

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) setState(ctx.prev);
      showToast.error("찜 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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
