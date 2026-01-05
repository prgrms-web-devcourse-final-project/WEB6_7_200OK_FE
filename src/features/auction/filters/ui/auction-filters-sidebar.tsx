"use client";

import {
  fromFilterValue,
  rangeToPriceValue,
  toFilterValue,
} from "@/features/auction/filters/lib/utils";
import { PRICE_RANGES } from "@/features/auction/filters/model/types";
import { useAuctionFilters } from "@/features/auction/filters/model/use-auction-filters";
import { CategoryFilterSection } from "@/features/auction/filters/ui/category-filter-section";
import { PriceFilterSection } from "@/features/auction/filters/ui/price-filter-section";
import { StatusFilterSection } from "@/features/auction/filters/ui/status-filter-section";
import { Button, Separator } from "@/shared/ui";

export function AuctionFiltersSidebar() {
  const { filters, setFilters, resetFilters } = useAuctionFilters();

  return (
    <aside className="bg-card hidden h-fit w-70 flex-col items-center gap-4 rounded-xl border p-4 lg:flex">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-semibold">필터</h2>
        <Button
          variant="ghost"
          className="text-muted-foreground w-fit px-2 text-sm"
          onClick={resetFilters}
        >
          초기화
        </Button>
      </div>

      <Separator />

      <PriceFilterSection
        value={rangeToPriceValue(filters.minPrice, filters.maxPrice)}
        onChange={(value) => {
          const range = PRICE_RANGES[value];

          setFilters({
            minPrice: range.minPrice,
            maxPrice: range.maxPrice,
          });
        }}
      />

      <Separator />

      <StatusFilterSection
        value={toFilterValue(filters.status)}
        onChange={(value) => setFilters({ status: fromFilterValue(value) })}
      />

      <Separator />

      <CategoryFilterSection
        value={toFilterValue(filters.category)}
        onChange={(value) => setFilters({ category: fromFilterValue(value) })}
      />
    </aside>
  );
}
