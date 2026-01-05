import {
  AUCTION_STATUS_FILTER,
  AUCTION_STATUS_FILTER_KEYS,
  type AuctionStatusFilterValueType,
} from "@/entities/auction/model/status";
import { FilterRadioGroup } from "@/features/auction/filters/ui/filter-radio-group";
import { FilterSection } from "@/features/auction/filters/ui/filter-section";

interface StatusFilterSectionProps {
  value: AuctionStatusFilterValueType;
  onChange: (value: AuctionStatusFilterValueType) => void;
}

export function StatusFilterSection({ value, onChange }: StatusFilterSectionProps) {
  return (
    <FilterSection title="경매 상태">
      <FilterRadioGroup<AuctionStatusFilterValueType>
        name="status"
        value={value}
        options={AUCTION_STATUS_FILTER_KEYS}
        getLabel={(key) => AUCTION_STATUS_FILTER[key]}
        onChange={onChange}
      />
    </FilterSection>
  );
}
