"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAuctionFilters } from "@/features/auction/filters/model/use-auction-filters";
import { ROUTES } from "@/shared/config/routes";
import SearchInput from "@/shared/ui/input/search-input";

export default function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const { filters, setFilters } = useAuctionFilters();

  const [query, setQuery] = useState(filters.query ?? "");

  useEffect(() => {
    setQuery(filters.query ?? "");
  }, [filters.query]);

  const applyQuery = (value: string) => {
    const trimmed = value.trim();

    if (pathname === ROUTES.auctions) {
      setFilters({ query: trimmed });
      return;
    }

    if (!trimmed) return;

    const params = new URLSearchParams();
    params.set("query", trimmed);
    router.push(`${ROUTES.auctions}?${params.toString()}`);
  };

  return (
    <form
      className="flex flex-1 items-center justify-center"
      onSubmit={(event) => {
        event.preventDefault();
        applyQuery(query);
      }}
    >
      <div className="w-full max-w-135">
        <label htmlFor="search" className="sr-only">
          검색
        </label>
        <SearchInput
          id="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onDelete={() => {
            setQuery("");
            applyQuery("");
          }}
        />
      </div>
    </form>
  );
}
