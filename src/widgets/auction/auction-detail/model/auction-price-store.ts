import { createStore } from "zustand/vanilla";

export interface AuctionPriceState {
  price: number;
  stopLoss: number;
}

export interface AuctionPriceActions {
  handleDropPrice: (dropAmount: number) => void;
}

export type AuctionPriceStore = AuctionPriceState & AuctionPriceActions;

export const defaultInitState: AuctionPriceState = {
  price: 0,
  stopLoss: 0,
};

export const createAuctionPriceStore = (initState: AuctionPriceState = defaultInitState) => {
  const store = createStore<AuctionPriceStore>((set) => ({
    ...initState,
    handleDropPrice: (dropAmount: number) => {
      if (typeof dropAmount !== "number" || !Number.isFinite(dropAmount) || dropAmount <= 0) return;

      set((state) => {
        const newState = state.price - dropAmount;
        return { ...state, price: newState < state.stopLoss ? state.stopLoss : newState };
      });
    },
  }));
  return store;
};
