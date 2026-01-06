import {
  type AuctionPublicStatusType,
  type AuctionStatusType,
} from "@/entities/auction/model/status";

export interface AuctionItemType {
  auctionId: number;
  imageUrl: string;
  title: string;
  isLiked: boolean;
  startedAt: string;
  status?: AuctionStatusType;
  isNotification?: boolean;
}

export interface AuctionPriceType {
  startPrice: number;
  currentPrice?: number;
  discountRate?: number;
  stopLoss?: number;
}

export type AuctionType = AuctionItemType & AuctionPriceType;

export type AuctionListType = Omit<AuctionType, "status"> & {
  status: AuctionPublicStatusType;
};
