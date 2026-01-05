import Image from "next/image";
import Link from "next/link";

import { Bell, Plus, User } from "lucide-react";

import Logo from "@/shared/assets/icons/windfall.svg";
import { ROUTES } from "@/shared/config/routes";
import { Container } from "@/shared/ui";
import Button from "@/shared/ui/button/button";
import SearchInput from "@/shared/ui/input/search-input";

export function Header() {
  return (
    <header className="bg-background h-header sticky top-0 z-50 hidden select-none md:flex">
      <Container className="lg:px flex items-center justify-around gap-4 px-2 min-[960px]:px-3 lg:px-5 xl:px-7">
        <Link href="/" className="shrink-0">
          <h1 className="flex items-center gap-1">
            <Image src={Logo} alt="윈드폴 로고" sizes="40px" />
            <span className="hidden text-xl font-semibold min-[960px]:block">Windfall</span>
          </h1>
        </Link>

        <form className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-135">
            <label htmlFor="search" className="sr-only">
              검색
            </label>
            {/* TODO: SearchInput 스타일 리팩토링 */}
            <SearchInput id="search" />
          </div>
        </form>

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

          <Button aria-label="알림" size="icon-lg" variant="ghost" className="relative">
            <Bell className="size-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* TODO: 로그인 연결 후 유저 아바타 */}
          <Button aria-label="프로필" size="icon-lg" variant="ghost">
            {/* 임시로 users/me/calendar로 이동하도록 삽입 */}
            <Link href="/users/me/calendar">
              <User className="size-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
