import { useEffect } from "react";

import { useServerTimeStore } from "@/shared/lib/hooks/use-server-time-store";

export function useServerTimeTicker() {
  const startTicker = useServerTimeStore((state) => state.startTicker);
  const stopTicker = useServerTimeStore((state) => state.stopTicker);

  useEffect(() => {
    startTicker();

    return () => stopTicker();
  }, [startTicker, stopTicker]);
}
