"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";

import { useRouter } from "next/navigation";

import { Client, type IFrame } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { type ChatMessage, type ChatRoomListItem, type WebSocketResponse } from "@/features/chat";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

import { WS_QUEUE_ERROR_CODES, WS_STOMP_ERROR_CODES } from "../model/types";

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

  const selectedChatIdRef = useRef(selectedChatId);

  useEffect(() => {
    selectedChatIdRef.current = selectedChatId;
  }, [selectedChatId]);

  useEffect(() => {
    setChatRooms(initialData);
  }, [initialData]);

  // 특정 채팅방을 읽음 처리 (낙관적 업데이트 적용)
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

  const handleChatRoomUpdate = useCallback((event: ChatRoomUpdateEvent) => {
    setChatRooms((prev) => {
      const targetIndex = prev.findIndex((room) => room.chatRoomId === event.chatRoomId);

      // 목록에 없는 방이면 무시
      if (targetIndex === -1) return prev;

      const targetRoom = prev[targetIndex];
      const isSelected = String(event.chatRoomId) === selectedChatIdRef.current;

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

      // 마지막 메시지 시간이 변경되었을 때만 정렬되도록
      if (targetRoom.lastMessage?.lastMessageAt !== event.lastMessageAt) {
        const otherRooms = prev.filter((_, idx) => idx !== targetIndex);
        return [updatedRoom, ...otherRooms];
      }

      // 마지막 메시지 시간 변경 없을 시 그대로 유지
      const newRooms = [...prev];
      newRooms[targetIndex] = updatedRoom;
      return newRooms;
    });
  }, []);

  const handleMessageUpdate = useCallback((id: string, message: ChatMessage) => {
    if (!message.messageId) return;

    setChatRooms((prev) => {
      const targetIndex = prev.findIndex((r) => r.chatRoomId === Number(id));
      if (targetIndex === -1) return prev;

      const targetRoom = prev[targetIndex];

      // 마지막 메시지 미리보기
      const preview = message.messageType === "IMAGE" ? "사진을 보냈습니다." : message.content;
      const type = message.messageType === "IMAGE" ? "IMAGE" : "TEXT";

      const isSelected = String(id) === selectedChatIdRef.current;
      const newUnreadCount = isSelected ? 0 : targetRoom.unreadCount;

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
  }, []);

  const handleQueueError = useCallback(
    (frame: IFrame) => {
      const errorResponse: WebSocketResponse = JSON.parse(frame.body);
      const { code } = errorResponse;

      switch (code) {
        case WS_QUEUE_ERROR_CODES.FORBIDDEN_CHAT_ROOM:
          showToast.error("접근 권한이 없는 채팅방입니다.");
          router.push("/auth/login");
          break;
        case WS_QUEUE_ERROR_CODES.INVALID_TRADE_STATUS_FOR_CHAT:
          showToast.error("거래 상태가 유효하지 않아 채팅을 할 수 없습니다.");
          break;
        case WS_QUEUE_ERROR_CODES.NOT_FOUND_CHAT_ROOM:
          showToast.error("존재하지 않는 채팅방입니다.");
          break;
        default:
          showToast.error("채팅 목록 연결 중 오류가 발생했습니다.");
      }
    },
    [router]
  );

  const handleStompError = useCallback(
    (frame: IFrame) => {
      if (!frame.body) return;

      const errorResponse: WebSocketResponse = JSON.parse(frame.body);
      const { code } = errorResponse;

      switch (code) {
        case WS_STOMP_ERROR_CODES.AUTH_REQUIRED:
        case WS_STOMP_ERROR_CODES.TOKEN_INVALID:
        case WS_STOMP_ERROR_CODES.TOKEN_EXPIRED:
        case WS_STOMP_ERROR_CODES.TOKEN_MISSING:
          showToast.error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          router.push("/auth/login");
          return;
        default:
          showToast.error("채팅 목록 연결 중 오류가 발생했습니다.");
      }
    },
    [router]
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
        // 내 채팅방 목록 전체 업데이트 구독
        client.subscribe(API_ENDPOINTS.wsUserQueueChatRooms, (frame) => {
          const event: ChatRoomUpdateEvent = JSON.parse(frame.body);
          handleChatRoomUpdate(event);
        });

        // 각 채팅방별 메시지 토픽 구독 (실시간 메시지 동기화 부분)
        chatRoomIds.forEach((id) => {
          client.subscribe(API_ENDPOINTS.wsChatRoom(id), (frame) => {
            const message: ChatMessage = JSON.parse(frame.body);
            handleMessageUpdate(id, message);
          });
        });

        // 에러 큐
        client.subscribe(API_ENDPOINTS.wsUserQueueErrors, handleQueueError);
      },
      onStompError: handleStompError,
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [
    accessToken,
    chatRoomIdsString,
    handleChatRoomUpdate,
    handleMessageUpdate,
    handleQueueError,
    handleStompError,
  ]);

  return { chatRooms, markRoomAsRead };
}
