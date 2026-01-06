"use client";

import { type ReactNode, createContext, useState, useContext } from "react";

import { useStore } from "zustand";

import {
  type EmojiStore,
  createEmojiStore,
} from "@/features/auction/auction-emoji/model/use-emoji-store";

export type EmojiStoreApi = ReturnType<typeof createEmojiStore>;

export const EmojiStoreContext = createContext<EmojiStoreApi | undefined>(undefined);

export const useEmojiStore = <T,>(selector: (store: EmojiStore) => T): T => {
  const emojiStoreContext = useContext(EmojiStoreContext);
  if (!emojiStoreContext) {
    throw new Error("useEmojiStore must be used within EmojiStoreProvider");
  }
  return useStore(emojiStoreContext, selector);
};

export interface EmojiStoreProviderProps {
  children: ReactNode;
}

export const EmojiStoreProvider = ({ children }: EmojiStoreProviderProps) => {
  const [store] = useState(() => createEmojiStore());
  return <EmojiStoreContext.Provider value={store}>{children}</EmojiStoreContext.Provider>;
};
