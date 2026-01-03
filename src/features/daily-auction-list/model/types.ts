import {
  SellingItemType,
  AuctionLikeItemType,
  RecentlyViewedItemType,
} from "@/entities/item/model/types";

export type DashboardItemType = SellingItemType | AuctionLikeItemType | RecentlyViewedItemType;
