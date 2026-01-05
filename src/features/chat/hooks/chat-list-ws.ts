"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";

import { useRouter } from "next/navigation";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { toast } from "sonner";

import type { ChatMessage, ChatRoomListItem } from "@/features/chat";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ChatRoomUpdateEvent {
  chatRoomId: number;
  lastMessagePreview: string;
  lastMessageAt: string;
  lastMessageType: "TEXT" | "IMAGE";
  resetUnread: boolean;
  unreadCountDelta: number;
}

export function useChatListSocket(
  initialData: ChatRoomListItem[],
  accessToken: string | undefined,
  selectedChatId: string | null
) {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoomListItem[]>(initialData);
  const clientRef = useRef<Client | null>(null);

  // 초기 데이터가 변경되면 상태 업데이트
  useEffect(() => {
    setChatRooms(initialData);
  }, [initialData]);

  // 특정 채팅방을 읽음 처리하는 함수 (낙관적 업데이트 적용)
  const markRoomAsRead = useCallback((chatRoomId: number) => {
    setChatRooms((prev) => {
      const targetIndex = prev.findIndex((room) => room.chatRoomId === chatRoomId);
      if (targetIndex === -1) return prev;

      const targetRoom = prev[targetIndex];

      // 이미 0이면 업데이트 불필요
      if (targetRoom.unreadCount === 0) return prev;

      const updatedRoom = { ...targetRoom, unreadCount: 0 };
      const newRooms = [...prev];
      newRooms[targetIndex] = updatedRoom;
      return newRooms;
    });
  }, []);

  const chatRoomIdsString = useMemo(
    () => initialData?.map((room) => room.chatRoomId).join(",") ?? "",
    [initialData]
  );

  const handleChatRoomUpdate = useCallback(
    (event: ChatRoomUpdateEvent) => {
      setChatRooms((prev) => {
        const targetIndex = prev.findIndex((room) => room.chatRoomId === event.chatRoomId);

        // 목록에 없는 방이면 무시
        if (targetIndex === -1) return prev;

        const targetRoom = prev[targetIndex];
        const isSelected = String(event.chatRoomId) === selectedChatId;

        let newUnreadCount = targetRoom.unreadCount + event.unreadCountDelta;
        if (isSelected || event.resetUnread) {
          newUnreadCount = 0;
        }

        const updatedRoom: ChatRoomListItem = {
          ...targetRoom,
          lastMessage: {
            preview: event.lastMessagePreview,
            lastMessageAt: event.lastMessageAt,
            type: event.lastMessageType,
          },
          unreadCount: newUnreadCount,
        };

        // 해당 방을 제거하고 맨 앞으로 이동 (최신순 정렬)
        const otherRooms = prev.filter((_, idx) => idx !== targetIndex);
        return [updatedRoom, ...otherRooms];
      });
    },
    [selectedChatId]
  );

  const handleMessageUpdate = useCallback(
    (id: string, message: ChatMessage) => {
      if (!message.messageId) return;

      setChatRooms((prev) => {
        const targetIndex = prev.findIndex((r) => r.chatRoomId === Number(id));
        if (targetIndex === -1) return prev;

        const targetRoom = prev[targetIndex];

        // 마지막 메시지 미리보기
        const preview = message.messageType === "IMAGE" ? "사진을 보냈습니다." : message.content;
        const type = message.messageType === "IMAGE" ? "IMAGE" : "TEXT";

        // 현재 보고 있는 방이면 안 읽음 수 증가 X
        const isSelected = String(id) === selectedChatId;
        const newUnreadCount = isSelected ? 0 : targetRoom.unreadCount + 1;

        const updatedRoom: ChatRoomListItem = {
          ...targetRoom,
          lastMessage: {
            preview,
            lastMessageAt: message.createdAt,
            type,
          },
          unreadCount: newUnreadCount,
        };

        const otherRooms = prev.filter((_, idx) => idx !== targetIndex);
        return [updatedRoom, ...otherRooms];
      });
    },
    [selectedChatId]
  );

  useEffect(() => {
    if (!accessToken) return;

    const chatRoomIds = chatRoomIdsString ? chatRoomIdsString.split(",") : [];

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}${API_ENDPOINTS.wsStomp}`),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 2000,
      onConnect: () => {
        console.warn("[ChatList WS] Connected...");
        // 내 채팅방 목록 전체 업데이트 구독
        client.subscribe(API_ENDPOINTS.wsUserQueueChatRooms, (frame) => {
          try {
            const event: ChatRoomUpdateEvent = JSON.parse(frame.body);
            console.warn("event", event);
            handleChatRoomUpdate(event);
          } catch (error) {
            console.error("[WS] Failed to parse chat room update:", error);
          }
        });

        // 각 채팅방별 메시지 토픽 구독 (실시간 메시지 동기화)
        chatRoomIds.forEach((id) => {
          client.subscribe(API_ENDPOINTS.wsChatRoom(id), (frame) => {
            try {
              const message: ChatMessage = JSON.parse(frame.body);
              handleMessageUpdate(id, message);
            } catch (error) {
              console.error(`[WS] Failed to parse room ${id} message:`, error);
            }
          });
        });

        // 에러 큐
        client.subscribe(API_ENDPOINTS.wsUserQueueErrors, (frame) => {
          console.error("[LIST WS] Error:", frame.body);
          // toast.error("채팅 목록 연결 중 오류가 발생했습니다.");
        });
      },
      onStompError: (frame) => {
        const errorMessage = frame.headers.message;
        console.error("[LIST WS] Stomp error:", errorMessage);

        // TODO: 임시 처리 (토큰 만료시 ExecutorSubscribableChannel[clientInboundChannel] 에러 발생)
        // 채팅방에 접속시에도 채팅 리스트 ws는 연결중이니 여기서 처리하는 게 중복 에러 처리 방지
        const isAuthError =
          errorMessage === "Unauthorized" || errorMessage.includes("[clientInboundChannel]");

        if (isAuthError) {
          toast.error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          router.push("/auth/login");
        } else {
          toast.error("채팅 목록 연결 중 오류가 발생했습니다.");
        }
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.warn("[ChatList WS] Disconnecting...");
      client.deactivate();
      clientRef.current = null;
    };
  }, [accessToken, chatRoomIdsString, router, handleChatRoomUpdate, handleMessageUpdate]);

  return { chatRooms, markRoomAsRead };
}
