import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { LogIn } from "lucide-react";

import Logo from "@/shared/assets/icons/windfall.svg";
import { ROUTES } from "@/shared/config/routes";
import { Container } from "@/shared/ui";
import Button from "@/shared/ui/button/button";
import SearchInput from "@/shared/ui/input/search-input";
import HeaderActions from "@/widgets/header/ui/header-actions";

export async function Header() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  const numericUserId = Number(userId);
  const hasValidUserId = Number.isInteger(numericUserId) && numericUserId > 0;

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

        {hasValidUserId ? (
          <HeaderActions userId={numericUserId} />
        ) : (
          <Button asChild size="lg">
            <Link href={ROUTES.login} aria-label="내 정보">
              <LogIn className="size-5" />
              <span className="font-semibold">로그인</span>
            </Link>
          </Button>
        )}
      </Container>
    </header>
  );
}
