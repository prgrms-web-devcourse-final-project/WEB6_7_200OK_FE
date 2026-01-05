export function fromFilterValue<T extends string>(value: T | "ALL"): T | undefined {
  return value === "ALL" ? undefined : value;
}

export function toFilterValue<T extends string>(value: T | undefined | null): T | "ALL" {
  return value === undefined || value === null || value === "" ? "ALL" : value;
}
