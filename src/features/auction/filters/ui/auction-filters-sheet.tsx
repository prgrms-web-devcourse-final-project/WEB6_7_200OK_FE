"use client";

import type { ReactNode } from "react";
import { useState } from "react";

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
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui";

interface AuctionFiltersSheetProps {
  trigger: ReactNode;
}

export function AuctionFiltersSheet({ trigger }: AuctionFiltersSheetProps) {
  const { filters, setFilters } = useAuctionFilters();

  const [open, setOpen] = useState(false);

  const init = () => ({
    category: filters.category,
    status: filters.status,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  const [draft, setDraft] = useState(() => init());

  return (
    <div className="lg:hidden">
      <Sheet
        open={open}
        onOpenChange={(next) => {
          if (next) setDraft(init());
          setOpen(next);
        }}
      >
        <SheetTrigger asChild>{trigger}</SheetTrigger>

        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
          <SheetHeader className="border-b pt-4">
            <SheetTitle className="text-base">필터</SheetTitle>
            <SheetDescription className="sr-only">
              원하는 필터를 선택한 뒤 적용 버튼을 눌러 결과를 확인하세요
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 py-2">
            <PriceFilterSection
              value={rangeToPriceValue(draft.minPrice, draft.maxPrice)}
              onChange={(value) => {
                const range = PRICE_RANGES[value];

                setDraft((prev) => ({
                  ...prev,
                  minPrice: range.minPrice,
                  maxPrice: range.maxPrice,
                }));
              }}
            />

            <Separator />

            <StatusFilterSection
              value={toFilterValue(draft.status)}
              onChange={(value) =>
                setDraft((prev) => ({
                  ...prev,
                  status: fromFilterValue(value),
                }))
              }
            />

            <Separator />

            <CategoryFilterSection
              value={toFilterValue(draft.category)}
              onChange={(value) =>
                setDraft((prev) => ({
                  ...prev,
                  category: fromFilterValue(value),
                }))
              }
            />
          </div>

          <div className="flex gap-2 border-t p-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                setDraft({
                  category: undefined,
                  status: undefined,
                  minPrice: undefined,
                  maxPrice: undefined,
                })
              }
            >
              초기화
            </Button>

            <Button
              className="flex-1"
              onClick={() => {
                setFilters({
                  category: draft.category,
                  status: draft.status,
                  minPrice: draft.minPrice,
                  maxPrice: draft.maxPrice,
                });

                setOpen(false);
              }}
            >
              적용
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
