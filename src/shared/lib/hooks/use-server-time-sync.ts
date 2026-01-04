import { useContext, useEffect } from "react";

import { type QueryKey } from "@tanstack/react-query";

import { useServerTimeStore } from "@/shared/lib/hooks/use-server-time-store";
import { useServerTimeTicker } from "@/shared/lib/hooks/use-server-time-ticker";
import { useThrottledInvalidate } from "@/shared/lib/hooks/use-throttled-invalidate";
import { ServerTimeStoreContext } from "@/shared/lib/providers/server-time-store-provider";
import { calculateNextPriceDropSeconds } from "@/shared/lib/utils/time/calc";

interface UseAuctionSyncProps {
  serverTime: string | undefined;
  queryKey: QueryKey;
}

export function useServerTimeSync({ serverTime, queryKey }: UseAuctionSyncProps) {
  const setServerTime = useServerTimeStore((state) => state.setServerTime);
  const throttledInvalidate = useThrottledInvalidate(queryKey);
  const serverTimeStoreContext = useContext(ServerTimeStoreContext);

  useEffect(() => {
    if (!serverTime) return;
    setServerTime(serverTime);
  }, [serverTime, setServerTime]);

  useServerTimeTicker();

  useEffect(() => {
    if (!serverTimeStoreContext) return;

    let prevSeconds: number | null = null;

    const unsubscribe = serverTimeStoreContext.subscribe(
      (state) => state.serverNowMs,
      (serverNowMs) => {
        const currentSeconds = calculateNextPriceDropSeconds(serverNowMs);

        if (prevSeconds === 1) throttledInvalidate();

        prevSeconds = currentSeconds;
      }
    );

    return unsubscribe;
  }, [serverTimeStoreContext, throttledInvalidate]);
}
