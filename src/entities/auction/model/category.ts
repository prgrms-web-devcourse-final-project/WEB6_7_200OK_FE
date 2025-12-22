export const ITEM_CATEGORIES = [
  "CLOTHING",
  "GOODS",
  "FURNITURE_INTERIOR",
  "DIGITAL",
  "APPLIANCE",
  "SPORTS_LEISURE",
  "PET",
  "HOBBY",
  "BOOK_TICKET",
  "ETC",
] as const;

export type ItemCategory = (typeof ITEM_CATEGORIES)[number];

export const FILTER_CATEGORIES = ["ALL", ...ITEM_CATEGORIES] as const;

export type CategoryFilter = (typeof FILTER_CATEGORIES)[number];

export const CATEGORY_LABEL: Record<CategoryFilter, string> = {
  ALL: "전체",
  CLOTHING: "의류",
  GOODS: "잡화",
  FURNITURE_INTERIOR: "가구/인테리어",
  DIGITAL: "디지털",
  APPLIANCE: "가전제품",
  SPORTS_LEISURE: "스포츠/레저",
  PET: "반려동물",
  HOBBY: "취미",
  BOOK_TICKET: "도서/티켓",
  ETC: "기타",
};
