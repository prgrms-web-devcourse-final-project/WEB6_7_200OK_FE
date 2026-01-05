"use client";

import { SlidersHorizontal } from "lucide-react";

import { AuctionFiltersSheet, AuctionSortDropdown } from "@/features/auction/filters";
import QuickFilterButtons from "@/screens/auction/auction-list/ui/quick-filter-buttons";
import { Button } from "@/shared/ui";

export default function AuctionListToolbar() {
  return (
    <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
      <QuickFilterButtons />
      <div className="flex gap-2">
        <AuctionSortDropdown />
        <AuctionFiltersSheet
          trigger={
            <Button variant="outline">
              <SlidersHorizontal /> 필터
            </Button>
          }
        />
      </div>
    </div>
  );
}
