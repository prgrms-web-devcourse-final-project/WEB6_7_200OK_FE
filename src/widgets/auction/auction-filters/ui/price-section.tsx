import { Input } from "@/shared/ui";
import {
  PRICE_FILTER_KEYS,
  PRICE_FILTERS,
  type PriceFilterValue,
} from "@/widgets/auction/auction-filters/model/constants";
import FilterRadioGroup from "@/widgets/auction/auction-filters/ui/filter-radio-group";
import FilterSection from "@/widgets/auction/auction-filters/ui/filter-section";

export default function PriceSection() {
  return (
    <FilterSection title="가격">
      <FilterRadioGroup<PriceFilterValue>
        name="price"
        defaultValue="ALL"
        options={PRICE_FILTER_KEYS}
        getLabel={(key) => PRICE_FILTERS[key]}
      />

      <div className="text-muted-foreground flex w-full flex-col gap-4 text-xs">
        <div className="flex w-full items-center gap-1">
          <Input type="number" className="text-xs" placeholder="100" aria-label="최소 가격" />
          <span className="shrink-0">원 ~</span>
          <Input type="number" className="text-xs" placeholder="100000" aria-label="최대 가격" />
          <span className="shrink-0">원</span>
        </div>
      </div>
    </FilterSection>
  );
}
