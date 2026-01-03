export const PRICE_FILTER_KEYS = [
  "ALL",
  "0-10000",
  "10000-50000",
  "50000-100000",
  "100000-500000",
  "500000-1000000",
  "1000000+",
] as const;

export type PriceFilterValue = (typeof PRICE_FILTER_KEYS)[number];

export const PRICE_FILTERS: Record<PriceFilterValue, string> = {
  ALL: "전체",
  "0-10000": "10,000원 이하",
  "10000-50000": "10,000원 ~ 50,000원",
  "50000-100000": "50,000원 ~ 100,000원",
  "100000-500000": "100,000원 ~ 500,000원",
  "500000-1000000": "500,000원 ~ 1,000,000원",
  "1000000+": "1,000,000원 이상",
} as const;

export type PriceFilterLabel = (typeof PRICE_FILTERS)[PriceFilterValue];
