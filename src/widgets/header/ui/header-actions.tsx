"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui";
import HeaderUserMenu from "@/widgets/header/ui/header-user-menu";

export default function HeaderActions({
  avatarUrl,
  avatarAlt,
}: {
  avatarUrl?: string;
  avatarAlt: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <Button asChild aria-label="경매 등록" size="icon-lg" className="min-[960px]:hidden">
        <Link href={ROUTES.auctionCreate}>
          <Plus className="size-5" />
        </Link>
      </Button>

      <Button asChild aria-label="경매 등록" size="lg" className="hidden min-[960px]:flex">
        <Link href={ROUTES.auctionCreate}>
          <Plus className="size-5" />
          <span className="font-semibold">경매 등록</span>
        </Link>
      </Button>

      {/* TODO: 알림 기능 복구 시 다시 노출 */}
      {/* <Button aria-label="알림" size="icon-lg" variant="ghost" className="relative">
        <Bell className="size-5" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
      </Button> */}

      <HeaderUserMenu avatarUrl={avatarUrl} avatarAlt={avatarAlt} />
    </div>
  );
}
