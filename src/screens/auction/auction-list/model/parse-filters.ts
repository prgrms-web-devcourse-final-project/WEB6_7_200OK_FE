import { ITEM_CATEGORIES } from "@/entities/auction/model/category";
import { AUCTION_PUBLIC_STATUS_KEYS } from "@/entities/auction/model/status";
import { AUCTION_SORT_BY, SORT_DIRECTION } from "@/screens/auction/auction-list/model/types";

import type { AuctionFilters, SearchParamsType } from "./types";

const getFirstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const parseNumber = (value: string | undefined) => {
  if (!value) return undefined;

  const parsed = Number(value);

  return Number.isNaN(parsed) ? undefined : parsed;
};

const validateEnum = <T extends readonly string[]>(
  value: string | undefined,
  allowedValues: T
): T[number] | undefined => {
  if (!value) return undefined;

  return allowedValues.includes(value) ? (value as T[number]) : undefined;
};

export const parseFilters = (searchParams: SearchParamsType): AuctionFilters => ({
  query: getFirstValue(searchParams.query),
  category: validateEnum(getFirstValue(searchParams.category), ITEM_CATEGORIES),
  status: validateEnum(getFirstValue(searchParams.status), AUCTION_PUBLIC_STATUS_KEYS),
  minPrice: parseNumber(getFirstValue(searchParams.minPrice)),
  maxPrice: parseNumber(getFirstValue(searchParams.maxPrice)),
  sortBy: validateEnum(getFirstValue(searchParams.sortBy), AUCTION_SORT_BY),
  sortDirection: validateEnum(getFirstValue(searchParams.sortDirection), SORT_DIRECTION),
});
