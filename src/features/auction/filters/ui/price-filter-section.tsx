import {
  PRICE_FILTER_KEYS,
  PRICE_FILTERS,
  type PriceFilterValueType,
} from "@/features/auction/filters/model/types";
import { FilterRadioGroup } from "@/features/auction/filters/ui/filter-radio-group";
import { FilterSection } from "@/features/auction/filters/ui/filter-section";

interface PriceFilterSectionProps {
  value: PriceFilterValueType;
  onChange: (value: PriceFilterValueType) => void;
}

export function PriceFilterSection({ value, onChange }: PriceFilterSectionProps) {
  return (
    <FilterSection title="가격">
      <FilterRadioGroup<PriceFilterValueType>
        name="price"
        value={value}
        options={PRICE_FILTER_KEYS}
        getLabel={(key) => PRICE_FILTERS[key]}
        onChange={onChange}
      />
    </FilterSection>
  );
}
