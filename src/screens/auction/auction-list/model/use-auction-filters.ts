"use client";

import { useMemo } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { parseFilters } from "@/screens/auction/auction-list/model/parse-filters";

import type { AuctionFilters } from "./types";

export function useAuctionFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => parseFilters(Object.fromEntries(searchParams)), [searchParams]);

  const setFilters = (updates: Partial<AuctionFilters>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  return { filters, setFilters, resetFilters };
}
