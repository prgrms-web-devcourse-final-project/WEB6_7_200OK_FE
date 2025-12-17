import { useCallback, useMemo } from "react";

import { Package, ShoppingBag, type LucideIcon } from "lucide-react";

import { DMItem } from "@/entities/dm";
import type { Chat, ListFilter } from "@/entities/dm";
import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";
import { ScrollArea } from "@/shared/ui/scroll-area/scroll-area";

interface ChatListSidebarProps {
  chats: Chat[];
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
  chats,
  selectedChatId,
  filter,
  onChatSelect,
  onFilterChange,
}: ChatListSidebarProps) {
  const filterOptions = useMemo<FilterOption[]>(
    () => [
      {
        value: "all",
        label: "전체",
        className: "h-9 w-15",
      },
      {
        value: "purchase",
        label: "구매 대화",
        icon: ShoppingBag,
        className: "h-9 w-26",
      },
      {
        value: "sale",
        label: "판매 대화",
        icon: Package,
        className: "h-9 w-26",
      },
    ],
    []
  );

  const handleFilterChange = useCallback(
    (filterValue: ListFilter) => () => {
      onFilterChange(filterValue);
    },
    [onFilterChange]
  );

  const handleChatChange = useCallback(
    (chatId: string) => () => {
      onChatSelect(chatId);
    },
    [onChatSelect]
  );

  return (
    <div
      className={cn(
        "border-border relative flex h-full w-full flex-col rounded-l-md rounded-r-none border border-r p-4 lg:w-2/5",
        selectedChatId ? "hidden lg:flex" : "flex"
      )}
    >
      {/* 탭 네비게이션 */}
      <div className={cn("mb-4 flex items-center gap-2")}>
        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = filter === option.value;

          return (
            <Button
              key={option.value}
              type="button"
              variant="ghost"
              onClick={handleFilterChange(option.value)}
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
      <ScrollArea className="flex-1">
        <div className={cn("flex flex-col")}>
          {chats.map((chat) => (
            <DMItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChatId === chat.id}
              onClick={handleChatChange(chat.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
