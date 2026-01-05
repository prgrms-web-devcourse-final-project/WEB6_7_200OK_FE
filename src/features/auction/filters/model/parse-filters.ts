import { ITEM_CATEGORIES } from "@/entities/auction/model/category";
import { AUCTION_PUBLIC_STATUS_KEYS } from "@/entities/auction/model/status";
import {
  AUCTION_SORT_BY,
  AUCTION_SORT_DIRECTION,
  type AuctionFilters,
} from "@/features/auction/filters/model/types";
import { SearchParamsType } from "@/screens/auction/auction-list/model/types";

const getFirst = (value: string | string[] | undefined) =>
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
  query: getFirst(searchParams.query),
  category: validateEnum(getFirst(searchParams.category), ITEM_CATEGORIES),
  status: validateEnum(getFirst(searchParams.status), AUCTION_PUBLIC_STATUS_KEYS),
  minPrice: parseNumber(getFirst(searchParams.minPrice)),
  maxPrice: parseNumber(getFirst(searchParams.maxPrice)),
  sortBy: validateEnum(getFirst(searchParams.sortBy), AUCTION_SORT_BY),
  sortDirection: validateEnum(getFirst(searchParams.sortDirection), AUCTION_SORT_DIRECTION),
});
