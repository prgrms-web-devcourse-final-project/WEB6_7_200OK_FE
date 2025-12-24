import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";

import { CATEGORY_LABEL, ITEM_CATEGORIES } from "../model/category";

interface CategorySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function CategorySelector({
  value,
  onValueChange,
  placeholder = "카테고리를 선택해주세요",
}: CategorySelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="!h-10 w-full rounded-lg border bg-transparent px-3 text-base md:text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {ITEM_CATEGORIES.map((item) => (
          <SelectItem key={item} value={item}>
            {CATEGORY_LABEL[item]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
