import Image from "next/image";

import AvatarSvg from "@/shared/assets/images/dm-images/avatar.svg";
import SonySvg from "@/shared/assets/images/dm-images/sony.svg";
import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

import type { Chat } from "../model/types";

interface DmListItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export function DmListItem({ chat, isSelected, onClick }: DmListItemProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "border-border rounded-y-md hover:bg-accent border-b-border relative h-auto w-full justify-start rounded-t-none rounded-b-none border-b p-2 py-4 text-left",
        isSelected && "bg-accent"
      )}
    >
      <div className="flex w-full flex-col">
        <div className="relative flex w-full items-start gap-3">
          <div className="relative shrink-0">
            <Image
              src={AvatarSvg}
              alt={chat.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{chat.name}</span>
              {chat.unreadCount > 0 && (
                <div className="bg-brand flex size-5 shrink-0 items-center justify-center rounded-full">
                  <span className="text-xs font-semibold text-white">{chat.unreadCount}</span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">{chat.lastMessage}</p>
          </div>
        </div>
        {chat.product && (
          <div
            className={cn(
              "bg-accent mt-2 flex w-fit items-center gap-1.5 rounded-md px-2 py-1.5",
              isSelected
                ? "bg-zinc-200/70 dark:bg-zinc-700/50"
                : "bg-zinc-200/40 dark:bg-zinc-800/70"
            )}
          >
            {/* 리스트 상품 이미지 표시 영역 */}
            {/* TODO: 상품 이미지 표시 추후 작업 필요 */}
            <Image
              src={SonySvg}
              alt={chat.product.name}
              width={20}
              height={20}
              className="size-5 shrink-0 rounded-full object-cover"
            />
            <span className="text-muted-foreground text-xs">{chat.product.name}</span>
          </div>
        )}
      </div>
    </Button>
  );
}
