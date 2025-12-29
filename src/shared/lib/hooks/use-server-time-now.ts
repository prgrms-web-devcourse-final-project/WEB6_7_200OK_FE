"use client";

import { useEffect, useState } from "react";

import { useServerTimeStore } from "@/shared/lib/hooks/use-server-time-store";

export function useServerTimeNow() {
  const getCurrentServerTime = useServerTimeStore((s) => s.getCurrentServerTime);
  const [now, setNow] = useState(() => getCurrentServerTime());

  useEffect(() => {
    setNow(getCurrentServerTime());

    const id = globalThis.setInterval(() => {
      setNow(getCurrentServerTime());
    }, 1_000);

    return () => globalThis.clearInterval(id);
  }, [getCurrentServerTime]);

  return now;
}
