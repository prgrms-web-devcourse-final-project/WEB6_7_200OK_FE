import { cn } from "@/shared/lib/utils/utils";

import type { Message } from "../model/types";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={cn("flex flex-col", message.isMine ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-full rounded-md px-4 py-2",
          message.isMine
            ? "bg-brand text-brand-contrast"
            : "border-border text-foreground dark:bg-background border bg-white"
        )}
      >
        <p className="text-sm">{message.message}</p>
      </div>
      <div className="mt-1 flex flex-row items-center gap-1 px-1">
        <span className="text-xs opacity-70">{message.time}</span>
        {message.isMine && (
          <span className="text-xs opacity-70">{message.isRead ? "· 읽음" : ""}</span>
        )}
      </div>
    </div>
  );
}
