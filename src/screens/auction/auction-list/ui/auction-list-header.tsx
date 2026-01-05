"use client";

import { CATEGORY_LABEL } from "@/entities/auction/model/category";
import { useAuctionFilters } from "@/features/auction/filters/model/use-auction-filters";

export default function AuctionListHeader() {
  const { filters } = useAuctionFilters();

  const getTitle = () => {
    if (filters.query) {
      return `"${filters.query}" 검색 결과`;
    }

    if (filters.category) {
      return CATEGORY_LABEL[filters.category as keyof typeof CATEGORY_LABEL];
    }

    return "전체";
  };

  return (
    <div className="flex items-center justify-center p-5">
      <h2 className="text-2xl font-semibold">{getTitle()}</h2>
    </div>
  );
}
