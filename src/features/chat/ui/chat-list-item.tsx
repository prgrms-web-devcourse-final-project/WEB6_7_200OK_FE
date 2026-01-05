import { memo } from "react";

import Image from "next/image";

import type { ChatRoomListItem } from "@/features/chat";
import { cn } from "@/shared/lib/utils/utils";
import { Button } from "@/shared/ui";

interface ChatListItemProps {
  chatRoom: ChatRoomListItem;
  isSelected: boolean;
  onSelect: (chatRoomId: string) => void;
}

function ChatListItemComponent({ chatRoom, isSelected, onSelect }: ChatListItemProps) {
  const handleClick = () => {
    onSelect(String(chatRoom.chatRoomId));
  };

  if (!chatRoom.partner || !chatRoom.auction) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleClick}
      className={cn(
        "border-border rounded-y-md hover:bg-accent border-b-border relative h-auto w-full justify-start rounded-t-none rounded-b-none border-b p-4 text-left",
        isSelected && "bg-accent"
      )}
    >
      <div className="flex w-full flex-col">
        <div className="relative flex w-full items-start gap-3">
          <div className="relative shrink-0">
            <Image
              src={chatRoom.partner.profileImageUrl}
              alt={chatRoom.partner.username}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{chatRoom.partner.username}</span>
              {chatRoom.unreadCount > 0 && (
                <div className="bg-brand flex h-6 shrink-0 items-center justify-center rounded-full px-2">
                  <span className="text-xs leading-none font-bold text-white">
                    {chatRoom.unreadCount > 999 ? "999+" : chatRoom.unreadCount}
                  </span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {chatRoom.lastMessage?.preview}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "bg-accent mt-2 flex w-fit items-center gap-1.5 rounded-md px-2 py-1.5",
            isSelected ? "bg-zinc-200/70 dark:bg-zinc-700/50" : "bg-zinc-200/40 dark:bg-zinc-800/70"
          )}
        >
          <Image
            src={chatRoom.auction.imageUrl}
            alt={chatRoom.auction.title}
            width={20}
            height={20}
            className="size-5 shrink-0 rounded-full object-cover"
          />
          <span className="text-muted-foreground text-xs">{chatRoom.auction.title}</span>
        </div>
      </div>
    </Button>
  );
}

export const ChatListItem = memo(ChatListItemComponent);
