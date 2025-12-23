import { createStore } from "zustand/vanilla";

export interface AuctionPriceState {
  price: number;
  stopLoss: number;
}

export interface AuctionPriceActions {
  handleDropPriceByRate: (rate: number) => void;
}

export type AuctionPriceStore = AuctionPriceState & AuctionPriceActions;

export const defaultInitState: AuctionPriceState = {
  price: 0,
  stopLoss: 0,
};

export const createAuctionPriceStore = (initState: AuctionPriceState = defaultInitState) => {
  const store = createStore<AuctionPriceStore>((set) => ({
    ...initState,
    handleDropPriceByRate: (rate: number) => {
      if (!Number.isFinite(rate) || rate <= 0) return;
      if (rate >= 100) {
        set((state) => ({ ...state, price: state.stopLoss }));
      }

      set((state) => {
        const newState = Math.floor((state.price * (100 - rate)) / 100);
        return { ...state, price: newState < state.stopLoss ? state.stopLoss : newState };
      });
    },
  }));
  return store;
};
