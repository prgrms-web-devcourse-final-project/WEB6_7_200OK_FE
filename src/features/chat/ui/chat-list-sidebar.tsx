import { useMemo } from "react";

import { MessageSquareOff, Package, ShoppingBag, type LucideIcon } from "lucide-react";

import type { ListFilter, ChatRoomListItem } from "@/features/chat";
import { cn } from "@/shared/lib/utils/utils";
import { Button, EmptyState, ScrollArea } from "@/shared/ui";

import { ChatListItem } from "./chat-list-item";

interface ChatListSidebarProps {
  chatRooms: ChatRoomListItem[];
  selectedChatId: string | null;
  filter: ListFilter;
  onChatSelect: (chatId: string) => void;
  onFilterChange: (filter: ListFilter) => void;
}

interface FilterOption {
  value: ListFilter;
  label: string;
  icon?: LucideIcon;
  className: string;
}

export function ChatListSidebar({
  chatRooms,
  selectedChatId,
  filter,
  onChatSelect,
  onFilterChange,
}: ChatListSidebarProps) {
  const filterOptions = useMemo<FilterOption[]>(
    () => [
      {
        value: "ALL",
        label: "전체",
        className: "h-9 w-15",
      },
      {
        value: "BUY",
        label: "구매 대화",
        icon: ShoppingBag,
        className: "h-9 w-26",
      },
      {
        value: "SELL",
        label: "판매 대화",
        icon: Package,
        className: "h-9 w-26",
      },
    ],
    []
  );

  return (
    <div
      className={cn(
        "border-border relative flex h-full w-full flex-col rounded-l-md rounded-r-none border border-r py-4 lg:w-2/5",
        selectedChatId ? "hidden lg:flex" : "flex"
      )}
    >
      {/* 탭 네비게이션 */}
      <div className="mb-2 flex items-center gap-2 p-4">
        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = filter === option.value;

          return (
            <Button
              key={option.value}
              type="button"
              variant="ghost"
              onClick={() => onFilterChange(option.value)}
              className={cn(
                "border-border rounded-md border px-3 py-2 text-sm font-medium",
                option.icon ? "flex items-center justify-center gap-1" : "",
                option.className,
                isActive ? "bg-brand text-brand-contrast" : "text-foreground"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "size-3.5",
                    isActive
                      ? "hover:text-accent-foreground"
                      : "hover:bg-accent dark:hover:bg-accent/50 text-foreground"
                  )}
                />
              )}
              {option.label}
            </Button>
          );
        })}
      </div>

      {/* 채팅 리스트 */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {chatRooms.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <EmptyState
              title="현재 채팅방이 없습니다."
              description="채팅방을 생성해주세요."
              Icon={MessageSquareOff}
              size="xl"
              className="rounded-none rounded-l-none rounded-r-md border-none bg-transparent"
            />
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="flex flex-col">
              {chatRooms.map((chatRoom) => (
                <ChatListItem
                  key={chatRoom.chatRoomId}
                  chatRoom={chatRoom}
                  isSelected={selectedChatId === String(chatRoom.chatRoomId)}
                  onSelect={onChatSelect}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
