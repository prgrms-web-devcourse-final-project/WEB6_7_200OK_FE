"use client";

import { ArrowDownUp, SlidersHorizontal } from "lucide-react";

import { AuctionFiltersSheet } from "@/features/auction/filters";
import QuickFilterButtons from "@/screens/auction/auction-list/ui/quick-filter-buttons";
import { Button } from "@/shared/ui";

export default function AuctionListToolbar() {
  return (
    <div className="flex w-full justify-between">
      <QuickFilterButtons />
      <div className="flex gap-2">
        <Button variant="outline">
          <ArrowDownUp /> 최신순
        </Button>
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
