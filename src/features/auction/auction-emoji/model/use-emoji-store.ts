import { createStore } from "zustand/vanilla";

import { EmojiType } from "@/entities/auction/model/emoji";

interface EmojiItemType {
  id: number;
  type: EmojiType;
  left: number;
  bottom: number;
  size: number;
  riseY: number;
  duration: number;
}

interface EmojiOptions {
  bottom?: number;
  size?: number;
  riseY?: number;
  duration?: number;
  paddingX?: number;
}

export interface EmojiState {
  items: EmojiItemType[];
}

export interface EmojiActions {
  addEmoji: (type: EmojiType, options?: EmojiOptions) => void;
  remove: (id: number) => void;
  clearEmoji: () => void;
}

export type EmojiStore = EmojiState & EmojiActions;

export const defaultInitState: EmojiState = {
  items: [],
};

let idSeq = 1;

export const createEmojiStore = (initState: EmojiState = defaultInitState) => {
  const store = createStore<EmojiStore>((set, get) => ({
    ...initState,

    addEmoji: (type, options) => {
      const duration = options?.duration ?? 5000;
      const riseY = options?.riseY ?? 160;
      const size = options?.size ?? (type === "LIKE" ? 96 : 24);
      const bottom = options?.bottom ?? 24;
      const paddingX = options?.paddingX ?? 24;

      const width = typeof window !== "undefined" ? window.innerWidth : 360;

      const left = Math.max(
        paddingX,
        Math.min(width - paddingX - size, Math.random() * (width - paddingX * 2))
      );

      const id = idSeq++;

      set((s) => ({
        items: [...s.items, { id, type, duration, riseY, size, bottom, left }],
      }));

      window.setTimeout(() => {
        get().remove(id);
      }, duration + 200);
    },
    remove: (id) =>
      set((s) => ({
        items: s.items.filter((v) => v.id !== id),
      })),
    clearEmoji: () => set({ items: [] }),
  }));
  return store;
};
