"use client";

import { type ReactNode, createContext, useState, useContext } from "react";

import { useStore } from "zustand";

import {
  type AuctionPriceStore,
  createAuctionPriceStore,
} from "@/widgets/auction/auction-detail/model/auction-price-store";

export type AuctionPriceStoreApi = ReturnType<typeof createAuctionPriceStore>;

export const AuctionPriceStoreContext = createContext<AuctionPriceStoreApi | undefined>(undefined);

export const useAuctionPriceStore = <T,>(selector: (store: AuctionPriceStore) => T): T => {
  const auctionPriceStoreContext = useContext(AuctionPriceStoreContext);
  if (!auctionPriceStoreContext) {
    throw new Error(`useAuctionPriceStore must be used within AuctionPriceStoreProvider`);
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
