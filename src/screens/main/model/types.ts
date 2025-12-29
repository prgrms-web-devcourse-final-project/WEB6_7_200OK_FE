import type { AuctionType } from "@/entities/auction/model/types";

export interface AuctionsData {
  serverAt: string;
  popularList: AuctionType[];
  processList: AuctionType[];
  scheduledList: AuctionType[];
}
