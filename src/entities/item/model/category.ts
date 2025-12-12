export const ITEM_CATEGORIES = [
  "clothing",
  "fashion_accessories",
  "furniture_interior",
  "digital",
  "home_appliances",
  "sports_leisure",
  "pets",
  "hobbies",
  "books_tickets",
  "others",
] as const;

export type ItemCategory = (typeof ITEM_CATEGORIES)[number];

export const FILTER_CATEGORIES = ["all", ...ITEM_CATEGORIES] as const;

export type CategoryFilter = (typeof FILTER_CATEGORIES)[number];

export const CATEGORY_LABEL: Record<CategoryFilter, string> = {
  all: "전체",
  clothing: "의류",
  fashion_accessories: "잡화",
  furniture_interior: "가구/인테리어",
  digital: "디지털",
  home_appliances: "가전제품",
  sports_leisure: "스포츠/레저",
  pets: "반려동물",
  hobbies: "취미",
  books_tickets: "도서/티켓",
  others: "기타",
};
