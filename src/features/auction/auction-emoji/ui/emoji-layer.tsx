"use client";

import Lottie from "react-lottie-player";

import { EMOJI_RECORD } from "@/features/auction/auction-emoji/model/emoji-files";
import { useEmojiStore } from "@/features/auction/auction-emoji/provider/use-emoji-store-provider";

export default function EmojiLayer() {
  const items = useEmojiStore((state) => state.items);
  return (
    <div className="pointer-events-none fixed inset-0 z-9999">
      {items.map((item) => (
        <div
          key={`emoji:${item.id}`}
          className="animate-emoji-rise absolute"
          style={{
            left: item.left,
            bottom: item.bottom,
            width: item.size,
            height: item.size,
          }}
        >
          <Lottie animationData={EMOJI_RECORD[item.type]} loop play />
        </div>
      ))}
    </div>
  );
}
