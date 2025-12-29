import { createStore } from "zustand/vanilla";

export interface ServerTimeStore {
  serverTimeOffset: number;

  setServerTime: (serverTime: string) => void;
  getCurrentServerTime: () => Date;
}

export const createServerTimeStore = () =>
  createStore<ServerTimeStore>()((set, get) => ({
    serverTimeOffset: 0,

    setServerTime: (serverTime: string) => {
      const clientTime = Date.now();

      set({
        serverTimeOffset: new Date(serverTime).getTime() - clientTime,
      });
    },

    getCurrentServerTime: () => {
      const { serverTimeOffset } = get();
      return new Date(Date.now() + serverTimeOffset);
    },
  }));
