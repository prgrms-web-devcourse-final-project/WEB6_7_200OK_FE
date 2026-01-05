import { ItemCategory } from "@/entities/auction";
import { AuctionPublicStatusType } from "@/entities/auction/model/status";

export const AUCTION_SORT_BY = ["createDate, startedAt"] as const;

export type AuctionSortByType = (typeof AUCTION_SORT_BY)[number];

export const AUCTION_SORT_DIRECTION = ["ASC", "DESC"] as const;

export type AuctionSortDirectionType = (typeof AUCTION_SORT_DIRECTION)[number];

export const PRICE_FILTER_KEYS = [
  "ALL",
  "0-10000",
  "10000-50000",
  "50000-100000",
  "100000-500000",
  "500000-1000000",
  "1000000+",
] as const;

export type PriceFilterValueType = (typeof PRICE_FILTER_KEYS)[number];

export const PRICE_FILTERS: Record<PriceFilterValueType, string> = {
  ALL: "전체",
  "0-10000": "10,000원 이하",
  "10000-50000": "10,000원 ~ 50,000원",
  "50000-100000": "50,000원 ~ 100,000원",
  "100000-500000": "100,000원 ~ 500,000원",
  "500000-1000000": "500,000원 ~ 1,000,000원",
  "1000000+": "1,000,000원 이상",
} as const;

export type PriceFilterLabelType = (typeof PRICE_FILTERS)[PriceFilterValueType];

export interface PriceRangeType {
  minPrice?: number;
  maxPrice?: number;
}

export const PRICE_RANGES: Record<PriceFilterValueType, PriceRangeType> = {
  ALL: {},
  "0-10000": { minPrice: 0, maxPrice: 10_000 },
  "10000-50000": { minPrice: 10_000, maxPrice: 50_000 },
  "50000-100000": { minPrice: 50_000, maxPrice: 100_000 },
  "100000-500000": { minPrice: 100_000, maxPrice: 500_000 },
  "500000-1000000": { minPrice: 500_000, maxPrice: 1_000_000 },
  "1000000+": { minPrice: 1_000_000 },
} as const;

export interface AuctionFilters {
  query?: string;
  category?: ItemCategory;
  status?: AuctionPublicStatusType;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: AuctionSortByType;
  sortDirection?: AuctionSortDirectionType;
}
