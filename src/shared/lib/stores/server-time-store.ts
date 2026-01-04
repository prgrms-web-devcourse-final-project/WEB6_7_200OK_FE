import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { calculateServerTimeNow } from "@/shared/lib/utils/time/calc";

export interface ServerTimeStore {
  serverTimeOffset: number;
  lastSyncServerTime: number | null;
  serverNowMs: number;
  tickerId: ReturnType<typeof globalThis.setInterval> | null;

  setServerTime: (serverTime: string) => void;
  updateServerNow: () => void;
  startTicker: () => void;
  stopTicker: () => void;
}

export const createServerTimeStore = () =>
  createStore<ServerTimeStore>()(
    subscribeWithSelector((set, get) => ({
      serverTimeOffset: 0,
      lastSyncServerTime: null,
      serverNowMs: Date.now(),
      tickerId: null,

      setServerTime: (serverTime: string) => {
        const serverTimeMs = Date.parse(serverTime);
        if (Number.isNaN(serverTimeMs)) return;

        const { lastSyncServerTime } = get();
        if (lastSyncServerTime === serverTimeMs) return;

        const clientTime = Date.now();
        const offset = serverTimeMs - clientTime;

        set({
          serverTimeOffset: offset,
          lastSyncServerTime: serverTimeMs,
          serverNowMs: calculateServerTimeNow(offset),
        });
      },

      updateServerNow: () => {
        const { serverTimeOffset } = get();
        set({ serverNowMs: calculateServerTimeNow(serverTimeOffset) });
      },

      startTicker: () => {
        const { tickerId } = get();
        if (tickerId !== null) return;

        get().updateServerNow();

        const id = globalThis.setInterval(() => {
          get().updateServerNow();
        }, 1_000);

        set({ tickerId: id });
      },

      stopTicker: () => {
        const { tickerId } = get();
        if (tickerId == null) return;

        globalThis.clearInterval(tickerId);
        set({ tickerId: null });
      },
    }))
  );
