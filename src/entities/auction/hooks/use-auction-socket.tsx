"use client";

import { useEffect } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import type { AuctionStatusType } from "@/entities/auction/model/status";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SocketResponseType {
  auctionId: string;
  viewerCount?: number;
  currentPrice?: number;
  status?: AuctionStatusType;
  emojiType?: "LIKE" | "FIRE" | "SAD" | "SMILE"; // TODO: 추후 이모지 구현할 때 타입 분리 예정
}

export default function useAuctionSocket(auctionId: string) {
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws-stomp`),
      reconnectDelay: 3000,

      // 연결
      onConnect: () => {
        // 구독
        client.subscribe(`/topic/auction/${auctionId}`, (frame) => {
          const response = JSON.parse(frame.body) as SocketResponseType;

          if (response.currentPrice) {
            console.log("금액 변경", response.currentPrice); // TODO: onExpiry 실행 or 서버 타임 diff 계산 및 반영
          }
          if (response.status) {
            console.log("경매 상태 변경", response.status); // TODO: 경매 status 변경 실행
          }
          if (response.viewerCount) {
            console.log("경매 시청자 변경", response.viewerCount); // TODO: 경매 viewer 변경 실행
          }
        });
      },

      // 연결  해제
      onDisconnect: () => {
        console.log("[STOMP] disconnected");
      },

      // 에러 발생
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
  }, [auctionId]);
}
