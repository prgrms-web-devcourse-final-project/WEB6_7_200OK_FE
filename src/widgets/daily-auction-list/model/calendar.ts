import dayjs from "dayjs";

import { SellingItem, WishlistItem, RecentlyViewedItem } from "@/entities/item/model/types";

export type DashboardItem = SellingItem | WishlistItem | RecentlyViewedItem;

export type AuctionFilterType = "전체" | "경매 예정" | "판매중";

export const filterItemsByDate = (items: DashboardItem[], date: Date | null): DashboardItem[] => {
  if (!date) return items;
  const dateStr = dayjs(date).format("YYYY/MM/DD");
  return items.filter((item) => item.date === dateStr);
};

export const filterItemsByStatus = (
  items: DashboardItem[],
  filterType: AuctionFilterType
): DashboardItem[] => {
  if (filterType === "전체") return items;
  return items.filter((item) => item.status === filterType);
};
