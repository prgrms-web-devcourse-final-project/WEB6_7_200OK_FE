"use client";

import { type ReactNode, createContext, useState, useContext } from "react";

import { useStore } from "zustand";

import {
  type AuctionPriceState,
  createAuctionPriceStore,
} from "@/widgets/auction/auction-detail/model/auction-price-store";

export type AuctionPriceStoreApi = ReturnType<typeof createAuctionPriceStore>;

export const AuctionPriceStoreContext = createContext<AuctionPriceStoreApi | undefined>(undefined);

export const useAuctionPriceStore = <T,>(selector: (store: AuctionPriceState) => T): T => {
  const auctionPriceStoreContext = useContext(AuctionPriceStoreContext);
  if (!auctionPriceStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(auctionPriceStoreContext, selector);
};
export interface AuctionPriceStoreProviderProps {
  children: ReactNode;
  price: number;
  stopLoss: number;
}

export const AuctionPriceStoreProvider = ({
  children,
  price,
  stopLoss,
}: AuctionPriceStoreProviderProps) => {
  const [store] = useState(() => createAuctionPriceStore({ price, stopLoss }));
  return (
    <AuctionPriceStoreContext.Provider value={store}>{children}</AuctionPriceStoreContext.Provider>
  );
};
