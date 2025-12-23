"use client";

import { type ReactNode, createContext, useState, useContext } from "react";

import { useStore } from "zustand";

import {
  type AuctionPriceState,
  createAuctionPriceStore,
} from "@/widgets/auction/auction-detail/model/auction-price-store";

export type AuctionPriceStoreApi = ReturnType<typeof createAuctionPriceStore>;

export const AuctionPriceStoreContext = createContext<AuctionPriceStoreApi | undefined>(undefined);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const useCounterStore = <T,>(selector: (store: AuctionPriceState) => T): T => {
  const auctionPriceStoreContext = useContext(AuctionPriceStoreContext);
  if (!auctionPriceStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(auctionPriceStoreContext, selector);
};

export const AuctionPriceStoreProvider = ({ children }: CounterStoreProviderProps) => {
  const [store] = useState(() => createAuctionPriceStore());
  return (
    <AuctionPriceStoreContext.Provider value={store}>{children}</AuctionPriceStoreContext.Provider>
  );
};
