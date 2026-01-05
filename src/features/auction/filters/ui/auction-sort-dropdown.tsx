"use client";

import { ArrowDownUp } from "lucide-react";

import { type AuctionSortType } from "@/features/auction/filters/model/types";
import { useAuctionFilters } from "@/features/auction/filters/model/use-auction-filters";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui";

const SORT_OPTIONS: AuctionSortType[] = [
  { value: "createDate:DESC", label: "최신 순", sortBy: "createDate", sortDirection: "DESC" },
  { value: "viewCount:DESC", label: "시청자 순", sortBy: "viewCount", sortDirection: "DESC" },
  { value: "startedAt:DESC", label: "할인률 순", sortBy: "startedAt", sortDirection: "DESC" },
  { value: "createDate:ASC", label: "오래된 순", sortBy: "createDate", sortDirection: "ASC" },
];

const DEFAULT_OPTION = SORT_OPTIONS[0];

export function AuctionSortDropdown() {
  const { filters, setFilters } = useAuctionFilters();

  const selectedOption =
    SORT_OPTIONS.find(
      (option) => option.sortBy === filters.sortBy && option.sortDirection === filters.sortDirection
    ) ?? DEFAULT_OPTION;

  const handleSortChange = (value: string) => {
    const option = SORT_OPTIONS.find((item) => item.value === value) ?? DEFAULT_OPTION;

    setFilters({ sortBy: option.sortBy, sortDirection: option.sortDirection });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ArrowDownUp />
          {selectedOption.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1.5">
        {SORT_OPTIONS.map((option) => {
          const isChecked = selectedOption.value === option.value;

          return (
            <DropdownMenuCheckboxItem
              key={option.value}
              onSelect={() => handleSortChange(option.value)}
              className="data-[state=checked]:text-brand-text flex cursor-pointer items-center py-2"
              aria-checked={isChecked}
              checked={isChecked}
            >
              <span>{option.label}</span>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
