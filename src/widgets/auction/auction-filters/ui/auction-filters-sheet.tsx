import { ReactNode } from "react";

import {
  CATEGORY_LABEL,
  CategoryFilter,
  FILTER_CATEGORIES,
} from "@/entities/auction/model/category";
import {
  AUCTION_STATUS_FILTER,
  AUCTION_STATUS_FILTER_KEYS,
  AuctionStatusFilterValueType,
} from "@/entities/auction/model/status";
import { Separator, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";
import PriceSection from "@/widgets/auction/auction-filters/ui/filter-price-section";
import RadioList from "@/widgets/auction/auction-filters/ui/filter-radio-list";
import FilterSection from "@/widgets/auction/auction-filters/ui/filter-section";

interface AuctionFiltersSheetProps {
  trigger?: ReactNode;
}

export function AuctionFiltersSheet({ trigger }: AuctionFiltersSheetProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>

        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle className="text-base">필터</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 pb-6">
            <PriceSection />

            <Separator />

            <FilterSection title="경매 상태">
              <RadioList<AuctionStatusFilterValueType>
                name="status"
                defaultValue="ALL"
                options={AUCTION_STATUS_FILTER_KEYS}
                getLabel={(key) => AUCTION_STATUS_FILTER[key]}
              />
            </FilterSection>

            <Separator />

            <FilterSection title="카테고리">
              <RadioList<CategoryFilter>
                name="category"
                defaultValue="ALL"
                options={FILTER_CATEGORIES}
                getLabel={(key) => CATEGORY_LABEL[key]}
              />
            </FilterSection>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
