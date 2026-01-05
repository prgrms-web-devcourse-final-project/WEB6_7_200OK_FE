"use client";

import { memo, useState, useRef, useLayoutEffect } from "react";

import Image from "next/image";

import { ChevronLeft, Image as ImageIcon, MessageSquareOff, Send } from "lucide-react";

import { ChatBubble, ChatItemCard, ChatItemCardSkeleton } from "@/entities/chat";
import { type ChatRoomListItem, type ChatRoomTradeInfo, type ChatMessage } from "@/features/chat";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { ScrollArea, Button, EmptyState, Input } from "@/shared/ui";

import { useUploadChatImages } from "../api/upload-chat-images";

interface ChatDetailProps {
  chatRoom: ChatRoomListItem | null;
  tradeInfo: ChatRoomTradeInfo | null;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onSendImageMessage: (imageUrls: string[]) => void;
  onBack: () => void;
  onLoadMore: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}

function ChatDetailComponent({
  chatRoom,
  tradeInfo,
  messages,
  onSendMessage,
  onSendImageMessage,
  onBack,
  onLoadMore,
  hasNextPage,
  isLoading,
}: ChatDetailProps) {
  const [messageInput, setMessageInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // 스크롤 상태 관리
  const prevScrollHeightRef = useRef(0);
  const isAtBottomRef = useRef(true); // 초기 로드 시 아래로 스크롤

  const hasMessage = messageInput.trim().length > 0;

  const displayPartner = chatRoom?.partner;
  const displayAuction = chatRoom?.auction;

  const { mutate: uploadImages, isPending: isUploading } = useUploadChatImages();

  const handleSend = () => {
    onSendMessage(messageInput);
    setMessageInput("");
    // 메시지 전송 시 강제로 하단 스크롤
    isAtBottomRef.current = true;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    if (files.length > 5) {
      showToast.error("이미지는 최대 5장까지 선택할 수 있습니다.");
      return;
    }

    const fileList = Array.from(files);
    uploadImages(fileList, {
      onSuccess: (data) => {
        const imageUrls = data.map((item) => item.imageUrl);
        onSendImageMessage(imageUrls);
        isAtBottomRef.current = true;
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;

    if (scrollTop === 0 && hasNextPage && !isLoading && onLoadMore) {
      prevScrollHeightRef.current = scrollHeight;
      onLoadMore();
    }
    const remainingScroll = scrollHeight - scrollTop - clientHeight;
    const bottomThreshold = scrollHeight * 0.05;
    const isBottom = remainingScroll <= bottomThreshold;

    isAtBottomRef.current = isBottom;
  };

  // 메시지 목록 변경 시 스크롤 위치 조정
  useLayoutEffect(() => {
    const viewRef = viewportRef.current;
    if (!viewRef) return;

    const currentScrollHeight = viewRef.scrollHeight;
    const prevScrollHeight = prevScrollHeightRef.current;

    // 이전 스크롤 높이가 있는 경우
    if (prevScrollHeight > 0) {
      viewRef.scrollTop = currentScrollHeight - prevScrollHeight;
      prevScrollHeightRef.current = 0;
    } else if (isAtBottomRef.current) {
      // 렌더링이 완전히 끝난 후 스크롤
      requestAnimationFrame(() => {
        viewRef.scrollTop = viewRef.scrollHeight;
      });
    }
  }, [messages]);

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
        {displayPartner && (
          <>
            <Image
              src={displayPartner.profileImageUrl}
              alt={displayPartner.username}
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-md font-semibold sm:text-base">{displayPartner.username}</p>
            </div>
          </>
        )}
      </div>

      {/* 상품 정보 카드 (상단 고정) */}
      <div className="border-border shrink-0 border-b px-6 py-4">
        {displayAuction && tradeInfo ? (
          <ChatItemCard auction={displayAuction} trade={tradeInfo} />
        ) : (
          <ChatItemCardSkeleton />
        )}
      </div>

      {/* 메시지 영역 */}
      <ScrollArea className="min-h-0 flex-1 p-4" onScroll={handleScroll} viewportRef={viewportRef}>
        <div className="flex flex-col gap-4 pb-4">
          {messages.map((message, index) => (
            <ChatBubble
              key={message.messageId ? String(message.messageId) : `${message.createdAt}-${index}`}
              message={message}
              partner={displayPartner}
            />
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && hasMessage) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 rounded-full"
          />
          <Button
            aria-label="이미지 첨부"
            variant="secondary"
            size="icon-lg"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center justify-center rounded-full"
          >
            <ImageIcon className="size-5" />
          </Button>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
            aria-label="이미지 업로드"
          />
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

export const ChatDetail = memo(ChatDetailComponent);
