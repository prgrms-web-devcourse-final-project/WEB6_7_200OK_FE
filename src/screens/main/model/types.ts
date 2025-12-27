import type { AuctionType } from "@/entities/auction/model/types";

export interface AuctionsData {
  popularList: AuctionType[];
  processList: AuctionType[];
  scheduledList: AuctionType[];
}
