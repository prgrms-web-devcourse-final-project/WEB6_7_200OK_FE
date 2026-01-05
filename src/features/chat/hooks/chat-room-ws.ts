"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";

import { Client, type IFrame } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import {
  type ChatRoomTradeInfo,
  type ChatMessage,
  type WebSocketResponse,
  type ChatReadEvent,
} from "@/features/chat";
import { type ApiResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

import { WS_STOMP_ERROR_CODES } from "../model/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MESSAGE_PAGE_SIZE = 20;

interface ChatSendRequest {
  chatRoomId: number;
  messageType: "TEXT" | "IMAGE";
  content: string;
  imageUrls: string[] | null;
}

interface ChatRoomResponse {
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
}

export function useChatRoomSocket(
  chatRoomId: string | null,
  accessToken: string | undefined,
  userId: number | null
) {
  const router = useRouter();

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

        if (!res.ok) {
          const errorResponse: ApiResponseType<null> = await res.json();
<<<<<<< HEAD
          const { code, message } = errorResponse;

          if (code === 400 || code === 403 || code === 404) {
            showToast.error(message);
          } else {
            showToast.error("메시지를 불러오는데 실패했습니다.");
=======

          switch (errorResponse.code) {
            case 400:
            case 403:
            case 404:
              showToast.error(errorResponse.message);
              break;
            default:
              showToast.error("메시지를 불러오는데 실패했습니다.");
>>>>>>> ce571c6 (refactor(chat): simplify error handling and logging in WebSocket hooks)
          }
          return;
        }

        const response: ApiResponseType<ChatRoomResponse> = await res.json();
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
      } catch {
        showToast.error("메시지 목록을 불러올 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    [chatRoomId, accessToken]
  );

  // 읽음 처리
  const markAsRead = useCallback(async () => {
    if (!chatRoomId || !accessToken) return;

    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: API_ENDPOINTS.wsChatRead,
        body: JSON.stringify({ chatRoomId: Number(chatRoomId) }),
      });
      return;
    }

    const res = await fetch(`${API_URL}${API_ENDPOINTS.chatRoomRead(chatRoomId)}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const apiError: ApiResponseType<null> = await res.json();
      if (apiError.code === 403 || apiError.code === 404) {
        showToast.error(apiError.message);
      }
      return;
    }

    if (!clientRef.current?.connected) {
      loadMessages(null);
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
        return;
      }

      // 이미지 URL 유효성 검증
      if (!imageUrls || imageUrls.length === 0) {
        showToast.error("전송할 이미지가 없습니다.");
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

  const handleStompError = useCallback(
    (frame: IFrame) => {
      if (!frame.body) return;

      try {
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
      } catch {
        showToast.error("채팅 연결 중 에러가 발생하였습니다.");
      }
    },
    [router]
  );

  const handleMessageReceived = useCallback(
    (frame: IFrame) => {
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

            if (clientRef.current?.connected && message.senderId !== userIdRef.current) {
              clientRef.current.publish({
                destination: API_ENDPOINTS.wsChatRead,
                body: JSON.stringify({ chatRoomId: Number(chatRoomId) }),
              });
            }

            return [...prev, message];
          });
        }
      } catch {
        showToast.error("채팅 메시지 처리 중 에러가 발생하였습니다.");
      }
    },
    [chatRoomId]
  );

  const handleReadEventReceived = useCallback((frame: IFrame) => {
    const event: ChatReadEvent = JSON.parse(frame.body);

    if (userIdRef.current && event.readerId !== userIdRef.current) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.messageId <= event.lastReadMessageId && !msg.isRead) {
            return { ...msg, isRead: true };
          }
          return msg;
        })
      );
    }
  }, []);

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
        client.subscribe(API_ENDPOINTS.wsChatRoom(chatRoomId), handleMessageReceived);
        client.subscribe(API_ENDPOINTS.wsRealTimeRead(chatRoomId), handleReadEventReceived);

        client.subscribe(API_ENDPOINTS.wsUserQueueErrors, () => {
          showToast.error("채팅방 연결 중 에러가 발생했습니다.");
        });

        client.publish({
          destination: API_ENDPOINTS.wsChatRead,
          body: JSON.stringify({ chatRoomId: Number(chatRoomId) }),
        });
      },
      onStompError: handleStompError,
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [chatRoomId, accessToken, handleMessageReceived, handleReadEventReceived, handleStompError]);

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
