"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { type ChatRoomListItem, type Message } from "@/features/chat";

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
  const [chatRooms, setChatRooms] = useState<ChatRoomListItem[]>(initialData);

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

  useEffect(() => {
    if (!accessToken) return;

    const chatRoomIds = chatRoomIdsString ? chatRoomIdsString.split(",") : [];

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws-stomp`),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 2000,
      onConnect: () => {
        console.warn("[ChatList WS] Connected...");
        // 내 채팅방 목록 전체 업데이트 구독
        client.subscribe("/user/queue/chat.rooms", (frame) => {
          try {
            const event: ChatRoomUpdateEvent = JSON.parse(frame.body);
            console.warn("event", event);

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
          } catch (error) {
            console.error("[WS] Failed to parse chat room update:", error);
          }
        });

        // 각 채팅방별 메시지 토픽 구독 (실시간 메시지 동기화)
        chatRoomIds.forEach((id) => {
          client.subscribe(`/topic/chat.rooms.${id}`, (frame) => {
            try {
              const message: Message = JSON.parse(frame.body);

              // 메시지 유효성 검사 (messageId 확인 등)
              if (!message.messageId) return;

              setChatRooms((prev) => {
                const targetIndex = prev.findIndex((r) => r.chatRoomId === Number(id));
                if (targetIndex === -1) return prev;

                const targetRoom = prev[targetIndex];

                // 이미지 메시지인 경우 미리보기 처리
                const preview = message.messageType === "IMAGE" ? "사진" : message.content;
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
            } catch (error) {
              // TODO: 각 채팅방별 메시지 토픽 구독 에러 처리
              console.error(`[WS] Failed to parse room ${id} message:`, error);
            }
          });
        });

        // 에러 큐
        client.subscribe("/user/queue/errors", (frame) => {
          // TODO: 에러 처리
          console.error("[WS] Error:", frame.body);
        });
      },
      onStompError: (frame) => {
        // TODO: 웹소켓 에러 처리
        console.error("[WS] Stomp error:", frame.headers.message);
      },
    });

    client.activate();

    return () => {
      console.warn("[ChatList WS] Disconnecting...");
      client.deactivate();
    };
  }, [accessToken, chatRoomIdsString, selectedChatId]);

  return { chatRooms, markRoomAsRead };
}
