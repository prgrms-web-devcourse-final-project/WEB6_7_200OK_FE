import { FILTER_CATEGORIES } from "@/entities/auction/model/category";
import { AUCTION_PUBLIC_STATUS_KEYS } from "@/entities/auction/model/status";
import {
  AuctionListParams,
  AUCTION_SORT_BY,
  SORT_DIRECTION,
} from "@/screens/auction/auction-list/model/types";

const getFirst = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const toNumber = (value: string | undefined): number | undefined => {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const validateEnum = <T extends readonly string[]>(
  value: string | undefined,
  valid: T
): T[number] | undefined => (value && valid.includes(value) ? value : undefined);

export function parseParams(
  params: Record<string, string | string[] | undefined>
): AuctionListParams {
  return {
    query: getFirst(params.query),
    category: validateEnum(getFirst(params.category), FILTER_CATEGORIES),
    status: validateEnum(getFirst(params.status), AUCTION_PUBLIC_STATUS_KEYS),
    minPrice: toNumber(getFirst(params.minPrice)),
    maxPrice: toNumber(getFirst(params.maxPrice)),
    page: toNumber(getFirst(params.page)) ?? 1,
    size: toNumber(getFirst(params.size)) ?? 15,
    sortBy: validateEnum(getFirst(params.sortBy), AUCTION_SORT_BY),
    sortDirection: validateEnum(getFirst(params.sortDirection), SORT_DIRECTION),
  };
}
