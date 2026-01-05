"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { toast } from "sonner";

import { type ChatRoomTradeInfo, type ChatMessage } from "@/features/chat";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MESSAGE_PAGE_SIZE = 20;

interface ChatSendRequest {
  chatRoomId: number;
  messageType: "TEXT" | "IMAGE";
  content: string;
  imageUrls: string[] | null;
}

interface ChatRoomResponse {
  code: number;
  status: string;
  message: string;
  data: {
    chatRoomMeta: {
      trade: ChatRoomTradeInfo;
    };
    messages: {
      content: ChatMessage[];
      nextCursor: number | null;
      hasNext: boolean;
      size: number;
      timeStamp: string;
    };
  };
}

export function useChatRoomSocket(
  chatRoomId: string | null,
  accessToken: string | undefined,
  userId: number | null
) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tradeInfo, setTradeInfo] = useState<ChatRoomTradeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const clientRef = useRef<Client | null>(null);
  const userIdRef = useRef(userId);

  // userIdRef 업데이트
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  // 메시지 미리보기
  const displayMessages = useMemo(
    () =>
      messages.map((msg) => ({
        ...msg,
        isMine: msg.senderId === userId,
      })),
    [messages, userId]
  );

  const loadMessages = useCallback(
    async (cursor: number | null = null) => {
      if (!chatRoomId || !accessToken) return;

      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("size", MESSAGE_PAGE_SIZE.toString());
        if (cursor) {
          params.append("cursor", cursor.toString());
        }

        const res = await fetch(
          `${API_URL}${API_ENDPOINTS.chatRoomMessages(chatRoomId)}?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.ok) {
          const response: ChatRoomResponse = await res.json();
          const { chatRoomMeta, messages: messageData } = response.data;

          if (!cursor && chatRoomMeta?.trade) {
            setTradeInfo(chatRoomMeta.trade);
          }

          const newMessages = messageData.content || [];

          // 메시지 오름차순 정렬
          const sortedMessages = [...newMessages].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

          setMessages((prev) => {
            if (cursor === null) return sortedMessages;

            // 중복 제거 및 병합
            const newIds = new Set(sortedMessages.map((m) => m.messageId));
            const filteredPrev = prev.filter((m) => !newIds.has(m.messageId));
            return [...sortedMessages, ...filteredPrev];
          });

          setNextCursor(messageData.nextCursor);
          setHasNextPage(messageData.hasNext);
        } else if (res.status === 401) {
          console.error("[Chat] Unauthorized: Access token might be invalid or expired.");
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [chatRoomId, accessToken]
  );

  // 읽음 처리
  const markAsRead = useCallback(() => {
    if (!chatRoomId || !accessToken) return;

    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: API_ENDPOINTS.wsChatRead,
        body: JSON.stringify({ chatRoomId: Number(chatRoomId) }),
      });
    } else {
      fetch(`${API_URL}${API_ENDPOINTS.chatRoomRead(chatRoomId)}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(() => {
          if (!clientRef.current?.connected) {
            loadMessages(null);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [chatRoomId, accessToken, loadMessages]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasNextPage && nextCursor) {
      loadMessages(nextCursor);
    }
  }, [isLoading, hasNextPage, nextCursor, loadMessages]);

  // 메시지 전송 (텍스트)
  const sendMessage = useCallback(
    (content: string) => {
      if (!clientRef.current?.connected || !chatRoomId) {
        console.error("Socket not connected or no chat room selected");
        return;
      }

      const payload: ChatSendRequest = {
        chatRoomId: Number(chatRoomId),
        messageType: "TEXT",
        content,
        imageUrls: null,
      };

      clientRef.current.publish({
        destination: API_ENDPOINTS.wsChatSend,
        body: JSON.stringify(payload),
      });
    },
    [chatRoomId]
  );

  // 메시지 전송 (이미지)
  const sendImageMessage = useCallback(
    (imageUrls: string[]) => {
      if (!clientRef.current?.connected || !chatRoomId) {
        console.error("Socket not connected or no chat room selected");
        return;
      }

      const payload: ChatSendRequest = {
        chatRoomId: Number(chatRoomId),
        messageType: "IMAGE",
        content: "사진을 보냈습니다.",
        imageUrls,
      };

      clientRef.current.publish({
        destination: API_ENDPOINTS.wsChatSend,
        body: JSON.stringify(payload),
      });
    },
    [chatRoomId]
  );

  // 초기 데이터 로드
  useEffect(() => {
    if (chatRoomId) {
      setMessages([]);
      setTradeInfo(null);
      setNextCursor(null);
      setHasNextPage(true);
      loadMessages(null);
      markAsRead();
    } else {
      setMessages([]);
      setTradeInfo(null);
    }
  }, [chatRoomId, loadMessages, markAsRead]);

  // 웹소켓 연결
  useEffect(() => {
    if (!chatRoomId || !accessToken) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}${API_ENDPOINTS.wsStomp}`),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 2000,
      onConnect: () => {
        console.warn(`[ChatRoom WS] Connected to room ${chatRoomId}`);
        client.subscribe(API_ENDPOINTS.wsChatRoom(chatRoomId), (frame) => {
          try {
            const parsedBody = JSON.parse(frame.body);
            if (parsedBody.messageId) {
              const message: ChatMessage = parsedBody;
              setMessages((prev) => {
                const existingIndex = prev.findIndex((m) => m.messageId === message.messageId);
                if (existingIndex !== -1) {
                  const newPrev = [...prev];
                  newPrev[existingIndex] = { ...newPrev[existingIndex], ...message };
                  return newPrev;
                }
                return [...prev, message];
              });
            }
          } catch (error) {
            console.error("[WS] Failed to parse message:", error);
          }
        });

        client.subscribe(API_ENDPOINTS.wsUserQueueErrors, (frame) => {
          console.error("[WS] Error:", frame.body);
          toast.error("채팅방 연결 중 에러가 발생했습니다.");
        });

        client.publish({
          destination: API_ENDPOINTS.wsChatRead,
          body: JSON.stringify({ chatRoomId: Number(chatRoomId) }),
        });
      },
      onStompError: (frame) => {
        const errorMessage = frame.headers.message;
        console.error("[ROOM WS] Stomp error:", errorMessage);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.warn(`[ChatRoom WS] Disconnecting from room ${chatRoomId}`);
      client.deactivate();
      clientRef.current = null;
    };
  }, [chatRoomId, accessToken]);

  return {
    messages: displayMessages,
    tradeInfo,
    sendMessage,
    sendImageMessage,
    loadMore,
    hasNextPage,
    isLoading,
  };
}
