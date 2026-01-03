export type TradeStatusType = "판매중" | "판매 완료" | "경매 예정" | "경매 종료";
export type PurchaseStatusType = "구매 완료" | "구매 확정";

export type ItemStatusType =
  | "판매중"
  | "판매 완료"
  | "경매 예정"
  | "경매 종료"
  | "구매 완료"
  | "구매 확정";

export interface BaseItemType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  date: string;
  imageUrl?: string;
}

export interface SellingItemType extends BaseItemType {
  status: TradeStatusType;
  unreadMessageCount?: number;
}

export interface PurchaseItemType extends BaseItemType {
  status: PurchaseStatusType;
  unreadMessageCount?: number;
  hasReview?: boolean;
  seller?: {
    name: string;
    avatarUrl?: string;
  };
}

export interface AuctionLikeItemType extends BaseItemType {
  status: TradeStatusType;
}

export interface RecentlyViewedItemType extends BaseItemType {
  status: TradeStatusType;
}
