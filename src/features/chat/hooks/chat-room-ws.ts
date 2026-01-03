"use client";

import { useEffect, useRef, useState, useCallback } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { type Message } from "@/features/chat";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ChatSendRequest {
  chatRoomId: number;
  messageType: "TEXT" | "IMAGE";
  content: string;
  imageUrls: string[] | null;
}

export interface ChatRoomTradeInfo {
  tradeId: number;
  finalPrice: number;
  purchasedAt: string;
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
      content: Message[];
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
  userId?: number
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tradeInfo, setTradeInfo] = useState<ChatRoomTradeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const clientRef = useRef<Client | null>(null);
  const userIdRef = useRef(userId);

  useEffect(() => {
    userIdRef.current = userId;
    if (userId) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.isMine === (msg.senderId === userId)) return msg;
          return { ...msg, isMine: msg.senderId === userId };
        })
      );
    }
  }, [userId]);

  // 메시지 로드 함수 (cursor 기반) - API 호출이므로 소켓 연결과 무관하게 정의
  const loadMessages = useCallback(
    async (cursor: number | null = null) => {
      if (!chatRoomId || !accessToken) return;

      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("size", "20");
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

          // userIdRef를 사용하여 isMine 보정
          const currentUserId = userIdRef.current;
          if (currentUserId) {
            newMessages.forEach((msg) => {
              msg.isMine = msg.senderId === currentUserId;
            });
          }

          // 과거 메시지가 상단에 오도록 오름차순 정렬
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
    [chatRoomId, accessToken] // userId 의존성 제거 (Ref 사용)
  );

  // 읽음 처리 함수 - 소켓 연결과 무관하게 호출 가능하도록 정의 (UI용)
  const markAsRead = useCallback(() => {
    if (!chatRoomId || !accessToken) return;

    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/chat.read",
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
        .catch(console.error);
    }
  }, [chatRoomId, accessToken, loadMessages]);

  // 방 변경 시 초기화 및 첫 로드
  useEffect(() => {
    if (chatRoomId) {
      setMessages([]);
      setTradeInfo(null);
      setNextCursor(null);
      setHasNextPage(true);
      loadMessages(null);

      // 채팅방 진입 시 읽음 처리
      markAsRead();
    } else {
      setMessages([]);
      setTradeInfo(null);
    }
  }, [chatRoomId, loadMessages, markAsRead]);

  // 더 불러오기 (UI에서 호출)
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
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
      });
    },
    [chatRoomId]
  );

  // 웹소켓 연결
  useEffect(() => {
    if (!chatRoomId || !accessToken) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws-stomp`),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.warn(`[ChatRoom WS] Connected to room ${chatRoomId}`);
        client.subscribe(`/topic/chat.rooms.${chatRoomId}`, (frame) => {
          try {
            const parsedBody = JSON.parse(frame.body);

            // 1. 일반 채팅 메시지 (messageId 존재)
            if (parsedBody.messageId) {
              const message: Message = parsedBody;

              const currentUserId = userIdRef.current;
              if (currentUserId) {
                message.isMine = message.senderId === currentUserId;
              }

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

        client.subscribe("/user/queue/errors", (frame) => {
          console.error("[WS] Error:", frame.body);
        });

        client.publish({
          destination: "/app/chat.read",
          body: JSON.stringify({ chatRoomId: Number(chatRoomId) }),
        });
      },
      onStompError: (frame) => {
        console.error("[WS] Stomp error:", frame.headers.message);
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

  return { messages, tradeInfo, sendMessage, loadMore, hasNextPage, isLoading };
}
