import type { AuctionType } from "@/entities/auction/model/types";

export interface HomeAuctionsData {
  popularList: AuctionType[];
  processList: AuctionType[];
  scheduledList: AuctionType[];
}
