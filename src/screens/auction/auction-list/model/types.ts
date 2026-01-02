import { CategoryFilter } from "@/entities/auction/model/category";
import { AuctionPublicStatusType } from "@/entities/auction/model/status";
import { AuctionType } from "@/entities/auction/model/types";

export const AUCTION_SORT_BY = ["startedAt", "createdAt", "price"] as const;

export type AuctionSortByType = (typeof AUCTION_SORT_BY)[number];

export const SORT_DIRECTION = ["ASC", "DESC"] as const;

export type SortDirectionType = (typeof SORT_DIRECTION)[number];

export interface AuctionListParams {
  query?: string;
  category?: CategoryFilter;
  status?: AuctionPublicStatusType;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  size?: number;
  sortBy?: AuctionSortByType;
  sortDirection?: SortDirectionType;
}

export interface AuctionListData {
  slice: AuctionType[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}
