import { AuctionType } from "@/entities/auction/model/types";

export interface SellerType {
  // TODO: 추후 user profile type 수정
  sellerId: number;
  username: string;
  profileImageUrl?: string;
  rating: number;
  reviewCount: number;
}

export interface BuyersType {
  buyerId: number;
  username: string;
  content: string;
}

export type SellerAuctionType = Pick<AuctionType, "auctionId" | "title"> & {
  auctionImageUrl: string;
};
export interface AuctionSellerInfoType {
  sellerId: number;
  username: string;
  rating: number;
  totalReviews: number;
  buyers: BuyersType[];
  auctions: SellerAuctionType[];
}
