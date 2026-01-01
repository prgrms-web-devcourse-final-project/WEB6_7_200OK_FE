// src/entities/auction/provider/auction-viewer-provider.tsx
"use client";

import React, { createContext, useContext, useRef } from "react";

import { useStore } from "zustand";

import {
  createAuctionViewerStore,
  type AuctionViewerStore,
  type AuctionViewerState,
} from "@/features/auction/auction-log/model/auction-viewer-store";

const AuctionViewerContext = createContext<AuctionViewerStore | null>(null);

export function AuctionViewerProvider({
  children,
  initCount,
}: {
  children: React.ReactNode;
  initCount: number;
}) {
  const storeRef = useRef<AuctionViewerStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuctionViewerStore(initCount);
  }

  return (
    <AuctionViewerContext.Provider value={storeRef.current}>
      {children}
    </AuctionViewerContext.Provider>
  );
}

export function useAuctionViewer<T>(selector: (s: AuctionViewerState) => T): T {
  const store = useContext(AuctionViewerContext);
  if (!store) throw new Error("useAuctionViewer must be used within AuctionViewerProvider");
  return useStore(store, selector);
}
