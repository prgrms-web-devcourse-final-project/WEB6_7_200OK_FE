import type { AuctionType, AuctionStatusType } from "@/entities/auction/model/types";
import type { ItemCategory } from "@/entities/item/model/category";
import type { RecentPriceHistoryType } from "@/features/auction-log/model/types";
import { SellerType } from "@/features/sale/model/types";

// TODO: 경매 태그 없음
export interface AuctionDetailType extends Omit<AuctionType, "imageUrl"> {
  // Overloading Type
  imageUrls: string[];
  stopLoss: number;
  // detail only Type
  description: string;
  likeCount: number;
  viewerCount: number;
  // extends Type
  status: AuctionStatusType;
  category: ItemCategory;
  seller: SellerType;
  recentPriceHistory: RecentPriceHistoryType[];
}
