import type { AuctionListType } from "@/entities/auction/model/types";
import type { AuctionFilters } from "@/features/auction/filters/model/types";

export type SearchParamsType = Record<string, string | string[] | undefined>;

export interface AuctionListParams extends AuctionFilters {
  page: number;
  size: number;
}

export interface AuctionListData {
  slice: AuctionListType[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}
