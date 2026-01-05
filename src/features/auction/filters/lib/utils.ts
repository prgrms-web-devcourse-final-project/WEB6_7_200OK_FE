import { PRICE_RANGES, PriceFilterValueType } from "@/features/auction/filters/model/types";

export function fromFilterValue<T extends string>(value: T | "ALL"): T | undefined {
  return value === "ALL" ? undefined : value;
}

export function toFilterValue<T extends string>(value: T | undefined | null): T | "ALL" {
  return value === undefined || value === null || value === "" ? "ALL" : value;
}

export function rangeToPriceValue(minPrice?: number, maxPrice?: number): PriceFilterValueType {
  if (minPrice === undefined && maxPrice === undefined) return "ALL";

  const match = Object.entries(PRICE_RANGES).find(
    ([, range]) => range.minPrice === minPrice && range.maxPrice === maxPrice
  );

  return (match?.[0] ?? "ALL") as PriceFilterValueType;
}
