import Image from "next/image";

import AvatarSvg from "@/shared/assets/images/dm-images/avatar.svg";
import SonySvg from "@/shared/assets/images/dm-images/sony.svg";
import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

import type { Chat } from "../model/types";

interface DMItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export function DMItem({ chat, isSelected, onClick }: DMItemProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "border-border hover:bg-accent relative h-auto w-full justify-start rounded-none border-b p-4 text-left",
        isSelected && "bg-accent"
      )}
    >
      <div className={cn("flex w-full flex-col")}>
        <div className={cn("relative flex w-full items-start gap-3")}>
          <div className={cn("relative shrink-0")}>
            <Image
              src={AvatarSvg}
              alt={chat.name}
              width={40}
              height={40}
              className={cn("rounded-full object-cover")}
            />
          </div>
          <div className={cn("min-w-0 flex-1")}>
            <div className={cn("flex items-center justify-between")}>
              <span className={cn("text-sm font-semibold")}>{chat.name}</span>
              {chat.unreadCount > 0 && (
                <div
                  className={cn(
                    "bg-brand flex size-5 shrink-0 items-center justify-center rounded-full"
                  )}
                >
                  <span className={cn("text-xs font-semibold text-white")}>{chat.unreadCount}</span>
                </div>
              )}
            </div>
            <p className={cn("text-muted-foreground text-xs leading-relaxed")}>
              {chat.lastMessage}
            </p>
          </div>
        </div>
        {chat.product && (
          <div
            className={cn(
              "bg-accent mt-1.5 flex w-fit items-center gap-1.5 rounded-md px-2 py-1.5",
              isSelected ? "bg-zinc-200/70 dark:bg-zinc-700" : "bg-zinc-200/70 dark:bg-zinc-800"
            )}
          >
            {/* 리스트 상품 이미지 표시 영역 */}
            {/* TODO: 상품 이미지 표시 추후 작업 필요 */}
            <Image
              src={SonySvg}
              alt={chat.product.name}
              width={20}
              height={20}
              className={cn("size-5 shrink-0 rounded-full object-cover")}
            />
            <span className={cn("text-muted-foreground text-xs")}>{chat.product.name}</span>
          </div>
        )}
      </div>
    </Button>
  );
}
