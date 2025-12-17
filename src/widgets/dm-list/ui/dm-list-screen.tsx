"use client";

import { useState } from "react";

import type { ListFilter, Message } from "@/entities/dm";
import { mockChats, mockMessages } from "@/entities/dm/api/mocks";
import { ChatDetail } from "@/features/dm-detail/ui/dm-detail";
import { ChatListSidebar } from "@/features/dm-list/ui/dm-list-sidebar";
import { cn } from "@/shared/lib/utils/utils";

export function DMListScreen() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ListFilter>("all");
  const [messages] = useState<Record<string, Message[]>>(mockMessages);

  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId) || null;
  const currentMessages = selectedChatId ? messages[selectedChatId] || [] : [];

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleFilterChange = (newFilter: ListFilter) => {
    // TODO: 채팅 필터 변경 로직 구현
    setFilter(newFilter);
  };

  const handleSendMessage = () => {
    // TODO: 채팅 전송 로직 구현
  };

  return (
    <div
      className={cn(
        "bg-background border-border mx-auto flex h-[calc(100vh-var(--header-h))] min-h-0 w-full max-w-7xl overflow-hidden"
      )}
    >
      <ChatListSidebar
        chats={mockChats}
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
          chat={selectedChat}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onBack={() => setSelectedChatId(null)}
        />
      </div>
    </div>
  );
}
