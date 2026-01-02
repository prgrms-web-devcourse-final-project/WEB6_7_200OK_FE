import { CATEGORY_LABEL, FILTER_CATEGORIES } from "@/entities/auction/model/category";
import { type CategoryFilter } from "@/entities/auction/model/category";
import { AUCTION_STATUS_FILTER, AUCTION_STATUS_FILTER_KEYS } from "@/entities/auction/model/status";
import { type AuctionStatusFilterValueType } from "@/entities/auction/model/status";
import { Button, Separator } from "@/shared/ui";
import PriceSection from "@/widgets/auction/auction-filters/ui/filter-price-section";
import RadioList from "@/widgets/auction/auction-filters/ui/filter-radio-list";
import FilterSection from "@/widgets/auction/auction-filters/ui/filter-section";

export function AuctionFiltersSidebar() {
  return (
    <aside className="bg-card hidden h-fit w-70 flex-col items-center gap-4 rounded-xl border p-4 lg:flex">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-semibold">필터</h2>
        <Button variant="ghost" className="text-muted-foreground w-fit px-2 text-sm">
          초기화
        </Button>
      </div>

      <Separator />

      <PriceSection />

      <Separator />

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
    </aside>
  );
}
