"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import * as Comlink from "comlink";

import type { AuctionTicker } from "@/entities/auction/model/auction-ticker";
import { useAuctionPriceStore } from "@/widgets/auction/auction-detail/provider/auction-price-store-provider";

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
  rate,
  duration,
  initDiff,
}: {
  children: React.ReactNode;
  rate: number;
  duration: number;
  initDiff: number;
}) {
  const workerRef = useRef<Worker | null>(null);
  const tickerRef = useRef<Comlink.Remote<AuctionTicker> | null>(null);
  const [remainMs, setRemainMs] = useState(() => duration - initDiff);
  const handleDropPriceByRate = useAuctionPriceStore((state) => state.handleDropPriceByRate);
  const handleOnExpiry = useCallback(() => {
    handleDropPriceByRate(rate);
  }, [handleDropPriceByRate, rate]);
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
        Comlink.proxy(handleOnExpiry),
        initDiff,
        duration
      );
    })();

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      tickerRef.current = null;
    };
  }, [duration, handleOnExpiry, initDiff]);

  const value = useMemo(() => ({ remainMs, duration }), [remainMs, duration]);

  return <AuctionTickerContext.Provider value={value}>{children}</AuctionTickerContext.Provider>;
}
