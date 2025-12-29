"use client";

import { useContext } from "react";

import { useStore } from "zustand";

import { ServerTimeStoreContext } from "@/shared/lib/providers/server-time-store-provider";
import { type ServerTimeStore } from "@/shared/lib/stores/server-time-store";

export const useServerTimeStore = <T>(selector: (store: ServerTimeStore) => T): T => {
  const serverTimeStoreContext = useContext(ServerTimeStoreContext);

  if (!serverTimeStoreContext) {
    throw new Error("useServerTimeStore는 ServerTimeStoreProvider 안에서 사용해야 합니다.");
  }

  return useStore(serverTimeStoreContext, selector);
};
