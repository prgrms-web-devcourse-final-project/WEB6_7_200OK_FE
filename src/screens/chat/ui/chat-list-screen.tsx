"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  ChatListSidebar,
  ChatDetail,
  type ListFilter,
  type Message,
  type ChatRoomListItem,
} from "@/features/chat";
import { cn } from "@/shared/lib/utils/utils";

interface ChatListScreenProps {
  initialData: ChatRoomListItem[];
}

export function ChatListScreen({ initialData }: ChatListScreenProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const filter = (searchParams?.get("scope") as ListFilter) || "ALL";

  const selectedChatRoom = selectedChatId
    ? initialData.find((room) => String(room.chatRoomId) === selectedChatId) || null
    : null;

  const currentMessages: Message[] = [];

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleFilterChange = (newFilter: ListFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("scope", newFilter);
    router.push(`?${params.toString()}`);
  };

  const handleSendMessage = () => {
    // TODO: 채팅 전송 로직 구현
  };

  const handleBack = () => {
    setSelectedChatId(null);
  };

  useEffect(() => {
    if (selectedChatId && !selectedChatRoom) {
      setSelectedChatId(null);
    }
  }, [selectedChatId, selectedChatRoom]);

  return (
    <div
      className={cn(
        "bg-background border-border mx-auto flex h-[calc(100vh-var(--header-h))] min-h-0 w-full max-w-7xl overflow-hidden md:py-4"
      )}
    >
      <ChatListSidebar
        chatRooms={initialData}
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
          chatRoom={selectedChatRoom}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
