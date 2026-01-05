import {
  UserSellingItemType,
  UserAuctionLikeItemType,
  UserRecentlyViewedItemType,
} from "@/entities/auction";

export type DashboardItemType =
  | UserSellingItemType
  | UserAuctionLikeItemType
  | UserRecentlyViewedItemType;
