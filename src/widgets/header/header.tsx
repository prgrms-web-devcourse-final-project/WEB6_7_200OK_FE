import Image from "next/image";
import Link from "next/link";

import { Bell, Plus, User } from "lucide-react";

import Logo from "@/shared/assets/icons/windfall.svg";
import Button from "@/shared/ui/button/button";
import SearchInput from "@/shared/ui/input/search-input";

// TODO: BottomNav와 model 공유할 수 있도록 refactor
export function Header() {
  return (
    <header className="bg-background h-header sticky top-0 z-50 hidden select-none md:flex">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0">
          <h1 className="flex items-center gap-2">
            <Image src={Logo} alt="윈드폴 로고" />
            <span className="hidden text-xl font-medium lg:block">Windfall</span>
          </h1>
        </Link>

        <form className="flex min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[626px]">
            <label htmlFor="search" className="sr-only">
              검색
            </label>
            {/* TODO: SearchInput 스타일 리팩토링 */}
            <SearchInput id="search" />
          </div>
        </form>

        {/* TODO: 로그인 아닐 시 로그인 버튼 */}
        <div className="flex shrink-0 items-center gap-3">
          <Button asChild aria-label="경매 등록" size="icon-lg" className="lg:hidden">
            <Link href="/auctions/create">
              <Plus className="size-5" />
            </Link>
          </Button>

          <Button asChild aria-label="경매 등록" size="lg" className="hidden lg:flex">
            <Link href="/auctions/create">
              <Plus className="size-5" />
              <span>경매 등록</span>
            </Link>
          </Button>

          <Button aria-label="알림" size="icon-lg" variant="ghost" className="relative">
            <Bell className="size-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* TODO: 로그인 연결 후 유저 아바타 */}
          <Button aria-label="프로필" size="icon-lg" variant="ghost">
            <User className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
