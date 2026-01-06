import {
  type AuctionPublicStatusType,
  type AuctionStatusType,
} from "@/entities/auction/model/status";

export interface AuctionItemType {
  auctionId: number;
  imageUrl: string;
  title: string;
  status?: AuctionStatusType;
  isLiked: boolean;
  isNotification?: boolean;
  startedAt: string;
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
