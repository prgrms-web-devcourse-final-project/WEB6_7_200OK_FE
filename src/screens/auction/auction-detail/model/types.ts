import type { ItemCategory } from "@/entities/auction";
import type { AuctionStatusType } from "@/entities/auction/model/status";
import type { AuctionType } from "@/entities/auction/model/types";
import type { RecentPriceHistoryType } from "@/features/auction/auction-log";
import type { SellerType } from "@/features/auction/auction-sale";

export interface AuctionDetailType extends Omit<AuctionType, "imageUrl"> {
  // Overriding Type
  imageUrls: string[];
  stopLoss: number;
  currentPrice: number;
  discountRate: number;
  // detail only Type
  description: string;
  likeCount: number;
  viewerCount: number;
  tags: string[];
  // extends Type
  status: AuctionStatusType;
  category: ItemCategory;
  seller: SellerType;
  recentPriceHistory: RecentPriceHistoryType[];
  serverTime: string;
  dropAmount: number;
}
