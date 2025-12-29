import { createStore } from "zustand/vanilla";

export interface ServerTimeStore {
  serverTimeOffset: number;
  lastSyncServerTime: number | null;

  setServerTime: (serverTime: string) => void;

  getCurrentServerTime: () => number;
}

export const createServerTimeStore = () =>
  createStore<ServerTimeStore>()((set, get) => ({
    serverTimeOffset: 0,
    lastSyncServerTime: null,

    setServerTime: (serverTime: string) => {
      const serverTimeMs = Date.parse(serverTime);

      if (Number.isNaN(serverTimeMs)) return;

      const { lastSyncServerTime } = get();
      if (lastSyncServerTime === serverTimeMs) return;

      const clientTime = Date.now();

      set({
        serverTimeOffset: serverTimeMs - clientTime,
        lastSyncServerTime: serverTimeMs,
      });
    },

    getCurrentServerTime: () => {
      const { serverTimeOffset } = get();
      return Date.now() + serverTimeOffset;
    },
  }));
