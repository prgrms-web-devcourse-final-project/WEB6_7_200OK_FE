"use client";

import { createContext, ReactNode, useState } from "react";

import { createServerTimeStore } from "@/shared/lib/stores/server-time-store";

export type ServerTimeStoreApi = ReturnType<typeof createServerTimeStore>;

export const ServerTimeStoreContext = createContext<ServerTimeStoreApi | undefined>(undefined);

export const ServerTimeStoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => createServerTimeStore());

  return (
    <ServerTimeStoreContext.Provider value={store}>{children}</ServerTimeStoreContext.Provider>
  );
};
