import {
  SellingItemType,
  WishlistItemType,
  RecentlyViewedItemType,
} from "@/entities/item/model/types";

export type DashboardItemType = SellingItemType | WishlistItemType | RecentlyViewedItemType;
