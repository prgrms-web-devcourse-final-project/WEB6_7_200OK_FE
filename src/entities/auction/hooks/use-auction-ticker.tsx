"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

import * as Comlink from "comlink";

import type { AuctionTicker } from "@/entities/auction/model/auction-ticker";

interface AuctionTickerValue {
  remainMs: number;
  duration: number;
}

const AuctionTickerContext = createContext<AuctionTickerValue | null>(null);

export function useAuctionTicker() {
  const ctx = useContext(AuctionTickerContext);
  if (!ctx) throw new Error("useAuctionTicker must be used within AuctionTickerProvider");
  return ctx;
}

export function AuctionTickerProvider({
  children,
  duration = 5 * 60 * 1000,
}: {
  children: React.ReactNode;
  duration?: number;
}) {
  const workerRef = useRef<Worker | null>(null);
  const tickerRef = useRef<Comlink.Remote<AuctionTicker> | null>(null);

  const [remainMs, setRemainMs] = useState(duration);

  useEffect(() => {
    const worker = new Worker(new URL("@/entities/auction/model/auction-ticker", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;

    const ticker = Comlink.wrap<AuctionTicker>(worker);
    tickerRef.current = ticker;
    (async () => {
      await ticker.start(
        Comlink.proxy((ms: number) => setRemainMs(ms)),
        duration
      );
    })();

    return () => {
      (async () => {
        try {
          await tickerRef.current?.stop();
        } finally {
          workerRef.current?.terminate();
          workerRef.current = null;
          tickerRef.current = null;
        }
      })();
    };
  }, [duration]);

  const value = useMemo(() => ({ remainMs, duration }), [remainMs, duration]);

  return <AuctionTickerContext.Provider value={value}>{children}</AuctionTickerContext.Provider>;
}
