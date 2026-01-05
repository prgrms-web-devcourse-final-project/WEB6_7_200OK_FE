"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import type { AuctionStatusType } from "@/entities/auction/model/status";
import { useAuctionViewer } from "@/features/auction/auction-log/provider/use-auction-viewer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SocketResponseType {
  auctionId: string;
  viewerCount?: number;
  currentPrice?: number;
  status?: AuctionStatusType;
  emojiType?: "LIKE" | "FIRE" | "SAD" | "SMILE";
}

export default function useAuctionSocket(auctionId: string) {
  const router = useRouter();
  const setViewerCount = useAuctionViewer((state) => state.setViewerCount);
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws-stomp-public`),
      reconnectDelay: 3000,

      // 연결
      onConnect: () => {
        // 구독
        client.subscribe(`/topic/auction/${auctionId}`, (frame) => {
          const response = JSON.parse(frame.body) as SocketResponseType;
          if (response.status) {
            if (response.status !== "PROCESS" && response.status !== "SCHEDULED") {
              router.refresh();
            }
          }
          if (response.viewerCount) {
            setViewerCount(response.viewerCount);
          }
        });
      },

      onDisconnect: () => {
        console.log("[STOMP] disconnected");
      },

      onStompError: (frame) => {
        console.error("[STOMP] stomp error:", frame.headers, frame.body);
      },
      onWebSocketError: (e) => {
        console.error("[WS] websocket error:", e);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [auctionId, setViewerCount, router]);
}
