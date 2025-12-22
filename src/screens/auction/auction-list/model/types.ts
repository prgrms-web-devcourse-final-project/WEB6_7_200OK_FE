import { AuctionType } from "@/entities/auction/model/types";

export interface AuctionListData {
  slice: AuctionType[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}
