import { memo } from "react";

import Image from "next/image";

import type { ChatMessage } from "@/features/chat/model/types";
import { dayjs } from "@/shared/lib/utils/dayjs";
import { cn } from "@/shared/lib/utils/utils";

interface ChatBubbleProps {
  message: ChatMessage;
  partner?: {
    username: string;
    profileImageUrl: string;
  };
}

function ChatBubbleComponent({ message, partner }: ChatBubbleProps) {
  const { isMine, messageType, content, imageUrls, createdAt, isRead } = message;
  const isSystem = messageType === "SYSTEM";
  const isImage = messageType === "IMAGE";
  const formattedTime = dayjs(createdAt).format("A h:mm");

  // 시스템 메시지 처리 (ex: 거래 채팅이 생성되었습니다. 안전 거래를 진행해 주세요.)
  if (isSystem) {
    return (
      <div className="flex w-full justify-center py-2">
        <span className="bg-accent/50 text-muted-foreground rounded-full px-3 py-1 text-xs">
          {content}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full gap-2", isMine ? "justify-end" : "justify-start")}>
      {!isMine && (
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          {partner && (
            <Image
              src={partner.profileImageUrl}
              alt={partner.username}
              fill
              className="object-cover"
            />
          )}
        </div>
      )}
      <div className={cn("flex max-w-[70%] flex-col", isMine ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-md px-4 py-2 text-sm",
            isMine
              ? "bg-brand text-brand-contrast"
              : "border-border text-foreground dark:bg-background border bg-white",
            isImage && "p-2"
          )}
        >
          {isImage ? (
            <div className="flex flex-col gap-2">
              {imageUrls.map((url) => (
                <div key={url} className="relative w-72 max-w-full overflow-hidden rounded-lg">
                  <Image
                    src={url}
                    alt=""
                    width={600}
                    height={600}
                    className="h-auto w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="wrap-break-word whitespace-pre-wrap">{content}</p>
          )}
        </div>
        <div className="mt-1 flex flex-row items-center gap-1 px-1">
          <span className="text-muted-foreground text-xs opacity-70 md:text-sm">
            {formattedTime}
          </span>
          {isMine && (
            <span className="text-muted-foreground text-xs opacity-70 md:text-sm">
              {isRead && "· 읽음"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export const ChatBubble = memo(ChatBubbleComponent);
