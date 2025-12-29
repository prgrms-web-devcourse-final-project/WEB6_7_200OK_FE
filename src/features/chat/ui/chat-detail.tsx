"use client";

import { useCallback, useMemo, useState } from "react";

import Image from "next/image";

import { ChevronLeft, Image as ImageIcon, MessageSquareOff, Send } from "lucide-react";

import { ChatBubble, ChatItemCard } from "@/entities/chat";
import type { ChatRoomListItem, Message } from "@/features/chat";
import { ScrollArea, Button, EmptyState, Input } from "@/shared/ui";

interface ChatDetailProps {
  chatRoom: ChatRoomListItem | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onBack: () => void;
}

export function ChatDetail({ chatRoom, messages, onSendMessage, onBack }: ChatDetailProps) {
  const [messageInput, setMessageInput] = useState("");

  const hasMessage = useMemo(() => messageInput.trim().length > 0, [messageInput]);

  const handleSend = useCallback(() => {
    // TODO: 메시지 전송 관련 로직 작업 예정
    onSendMessage("");
  }, [onSendMessage]);

  if (!chatRoom) {
    return (
      <EmptyState
        title="메시지가 없습니다."
        description="채팅 목록에서 대화방을 선택해주세요."
        Icon={MessageSquareOff}
        size="xl"
        className="border-border rounded-none rounded-l-none rounded-r-md border bg-transparent"
      />
    );
  }

  return (
    <div className="border-border flex h-full min-h-0 flex-col rounded-l-none rounded-r-md border">
      {/* 헤더 */}
      <div className="border-border flex shrink-0 items-center gap-3 border-b p-2">
        <Button
          aria-label="뒤로가기"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <Image
          src={chatRoom.partner.profileImageUrl}
          alt={chatRoom.partner.username}
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-md object-cover"
        />
        <div className="flex-1">
          <p className="text-lg font-semibold">{chatRoom.partner.username}</p>
        </div>
      </div>

      {/* 메시지 영역 */}
      <ScrollArea className="min-h-0 flex-1 p-4">
        <div className="flex flex-col gap-4">
          <ChatItemCard auction={chatRoom.auction} />
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      {/* 입력 영역 */}
      <div className="border-border shrink-0 border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="메시지 입력..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={() => {}}
            className="flex-1 rounded-full"
          />
          <Button
            aria-label="이미지 첨부"
            variant="secondary"
            size="icon-lg"
            onClick={handleSend}
            disabled={!hasMessage}
            className="flex items-center justify-center rounded-full"
          >
            <ImageIcon className="size-5" />
          </Button>
          <Button
            aria-label="채팅 전송"
            variant="secondary"
            size="icon-lg"
            onClick={handleSend}
            disabled={!hasMessage}
            className="flex items-center justify-center rounded-full"
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
