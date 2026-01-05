import {
  CATEGORY_LABEL,
  FILTER_CATEGORIES,
  type CategoryFilter,
} from "@/entities/auction/model/category";
import { FilterRadioGroup } from "@/features/auction/filters/ui/filter-radio-group";
import { FilterSection } from "@/features/auction/filters/ui/filter-section";

interface CategoryFilterSectionProps {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
}

export function CategoryFilterSection({ value, onChange }: CategoryFilterSectionProps) {
  return (
    <FilterSection title="카테고리">
      <FilterRadioGroup<CategoryFilter>
        name="category"
        value={value}
        options={FILTER_CATEGORIES}
        getLabel={(key) => CATEGORY_LABEL[key]}
        onChange={onChange}
      />
    </FilterSection>
  );
}
