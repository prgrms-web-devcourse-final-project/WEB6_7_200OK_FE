"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useChatListSocket, useChatRoomSocket } from "@/features/chat";
import {
  ChatListSidebar,
  ChatDetail,
  type ListFilter,
  type ChatRoomListItem,
} from "@/features/chat";
import { getCookie } from "@/shared/lib/utils/cookie";
import { cn } from "@/shared/lib/utils/utils";

interface ChatListScreenProps {
  initialData: ChatRoomListItem[];
  accessToken: string;
}

export function ChatListScreen({ initialData, accessToken }: ChatListScreenProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | undefined>();

  useEffect(() => {
    if (userId === undefined) {
      const userIdCookie = getCookie("userId");
      if (userIdCookie) {
        setUserId(Number(userIdCookie));
      }
    }
  }, [accessToken, userId]);

  const filter = (searchParams?.get("scope") as ListFilter) || "ALL";

  // 채팅방 목록 웹소켓 연결
  const { chatRooms, markRoomAsRead } = useChatListSocket(
    initialData || [],
    accessToken,
    selectedChatId
  );

  // 채팅방 상세 웹소켓 연결
  const { messages, tradeInfo, sendMessage, sendImageMessage, loadMore, hasNextPage, isLoading } =
    useChatRoomSocket(selectedChatId, accessToken, userId ?? null);

  const selectedChatRoom = selectedChatId
    ? chatRooms.find((room) => String(room.chatRoomId) === selectedChatId) || null
    : null;

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    markRoomAsRead(Number(chatId)); // 채팅방 선택 시 즉시 읽음 처리
  };

  const handleFilterChange = (newFilter: ListFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("scope", newFilter);
    router.push(`?${params.toString()}`);
  };

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const handleBack = () => {
    setSelectedChatId(null);
  };

  useEffect(() => {
    // 선택된 채팅방이 목록에 없으면 선택 해제
    const isSelectedRoomExist =
      selectedChatId && chatRooms.some((room) => String(room.chatRoomId) === selectedChatId);

    if (selectedChatId && !isSelectedRoomExist && chatRooms.length > 0) {
      setSelectedChatId(null);
    }
  }, [selectedChatId, chatRooms]);

  return (
    <div
      className={cn(
        "bg-background border-border mx-auto flex h-[calc(100vh-var(--header-h)*2)] min-h-0 w-full max-w-7xl overflow-hidden md:py-4"
      )}
    >
      <ChatListSidebar
        chatRooms={chatRooms}
        selectedChatId={selectedChatId}
        filter={filter}
        onChatSelect={handleChatSelect}
        onFilterChange={handleFilterChange}
      />
      <div
        className={cn(
          "flex h-full min-h-0 flex-1 flex-col",
          selectedChatId ? "flex" : "hidden lg:flex"
        )}
      >
        <ChatDetail
          key={selectedChatId}
          chatRoom={selectedChatRoom}
          tradeInfo={tradeInfo}
          messages={messages}
          onSendMessage={handleSendMessage}
          onSendImageMessage={sendImageMessage}
          onBack={handleBack}
          onLoadMore={loadMore}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
