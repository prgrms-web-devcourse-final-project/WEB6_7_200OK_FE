import { createStore } from "zustand/vanilla";

export interface AuctionViewerState {
  viewerCount: number;
  setViewerCount: (count: number) => void;
}

export function createAuctionViewerStore(initCount: number) {
  return createStore<AuctionViewerState>((set) => ({
    viewerCount: initCount,
    setViewerCount: (count) => set({ viewerCount: count }),
  }));
}

export type AuctionViewerStore = ReturnType<typeof createAuctionViewerStore>;
