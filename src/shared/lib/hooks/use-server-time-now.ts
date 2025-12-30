"use client";

import { useEffect, useRef, useState } from "react";

import { useServerTimeStore } from "@/shared/lib/hooks/use-server-time-store";
import { calculateServerNow } from "@/shared/lib/utils/time/calc";

export function useServerTimeNow() {
  const serverTimeOffset = useServerTimeStore((s) => s.serverTimeOffset);
  const offsetRef = useRef(serverTimeOffset);

  useEffect(() => {
    offsetRef.current = serverTimeOffset;
  }, [serverTimeOffset]);

  const [now, setNow] = useState(() => calculateServerNow(offsetRef.current));

  useEffect(() => {
    const tick = () => setNow(calculateServerNow(offsetRef.current));

    tick();

    const id = globalThis.setInterval(tick, 1_000);

    return () => globalThis.clearInterval(id);
  }, []);

  return now;
}
