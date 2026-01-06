"use client";

import { useEffect, useRef } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import type { EmojiType } from "@/entities/auction/model/emoji";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useAuctionSellerSocket(auctionId: string | number, token?: string) {
  const socketRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!API_URL || !token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws-stomp`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 3000,

      // 연결
      onConnect: () => {},

      onStompError: (frame) => {
        console.error("[STOMP] stomp error:", frame.headers, frame.body);
      },
      onWebSocketError: (e) => {
        console.error("[WS] websocket error:", e);
      },
    });
    client.activate();
    socketRef.current = client;
    return () => {
      client.deactivate();
    };
  }, [auctionId, token]);

  const handleSendEmoji = (emoji: EmojiType) => {
    const client = socketRef.current;

    if (!client || !client.connected) {
      return showToast.error("알 수 없는 이유로 실행할 수 없습니다");
    }

    client.publish({
      destination: `/app/auctions/${auctionId}/emoji`,
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        emojiType: emoji,
      }),
    });
  };

  return { handleSendEmoji };
}
