"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/shared/config/routes";
import SearchInput from "@/shared/ui/input/search-input";
import { SubHeader } from "@/widgets/sub-header/sub-header";

export function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      if (mediaQuery.matches) {
        router.replace(ROUTES.auctions);
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const params = new URLSearchParams();
    params.set("query", trimmed);
    router.push(`${ROUTES.auctions}?${params.toString()}`);
  };

  return (
    <div className="bg-background flex min-h-screen w-full flex-col lg:hidden">
      <SubHeader
        content={
          <form className="w-full" onSubmit={handleSubmit}>
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onDelete={() => setQuery("")}
              placeholder="검색어를 입력해주세요"
            />
          </form>
        }
      />

      <main className="flex-1 px-4 pb-6">
        <section className="pt-4">
          <h2 className="text-sm font-semibold">최근 검색어</h2>
          <div className="mt-3 min-h-24" />
        </section>
      </main>
    </div>
  );
}
