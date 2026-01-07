import { Suspense } from "react";

import Image from "next/image";
import Link from "next/link";

import Logo from "@/shared/assets/icons/windfall.svg";
import { Container } from "@/shared/ui";
import HeaderAuthSlot from "@/widgets/header/ui/header-auth-slot";
import HeaderSearch from "@/widgets/header/ui/header-search";

export function Header() {
  return (
    <header className="bg-background h-header sticky top-0 z-50 hidden select-none md:flex">
      <Container className="lg:px flex h-full items-center gap-4 px-2 py-0 min-[960px]:px-3 lg:px-5 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,540px)_minmax(0,1fr)] xl:gap-4 xl:px-7">
        <Link href="/" className="shrink-0">
          <h1 className="flex items-center gap-1">
            <Image src={Logo} alt="윈드폴 로고" sizes="40px" />
            <span className="hidden text-xl font-semibold min-[960px]:block">Windfall</span>
          </h1>
        </Link>

        <div className="flex-1 xl:w-full">
          <Suspense fallback={<div className="h-10 w-full" aria-hidden />}>
            <HeaderSearch />
          </Suspense>
        </div>

        <HeaderAuthSlot />
      </Container>
    </header>
  );
}
