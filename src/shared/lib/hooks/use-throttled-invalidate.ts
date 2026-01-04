"use client";

import { useCallback, useRef } from "react";

import { type QueryKey, useQueryClient } from "@tanstack/react-query";

interface ThrottledInvalidateProps {
  throttleMs?: number;
  refetchType?: "active" | "inactive" | "all" | "none";
}

export function useThrottledInvalidate(
  queryKey: QueryKey,
  { throttleMs = 1000, refetchType = "active" }: ThrottledInvalidateProps = {}
) {
  const queryClient = useQueryClient();
  const lastExecutedRef = useRef(0);

  return useCallback(() => {
    const now = Date.now();
    if (now - lastExecutedRef.current < throttleMs) return;

    lastExecutedRef.current = now;

    queryClient.invalidateQueries({
      queryKey,
      exact: true,
      refetchType,
    });
  }, [queryClient, queryKey, throttleMs, refetchType]);
}
