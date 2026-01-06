export type UserTradeStatusType = "판매중" | "판매 완료" | "경매 예정" | "경매 종료";
export type UserPurchaseStatusType = "구매 완료" | "구매 확정";

export interface BaseUserItemType {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  date: string;
  imageUrl?: string;
}

export interface UserSellingItemType extends BaseUserItemType {
  status: UserTradeStatusType;
  unreadMessageCount?: number;
}

export interface UserPurchaseItemType extends BaseUserItemType {
  status: UserPurchaseStatusType;
  unreadMessageCount?: number;
  hasReview?: boolean;
  seller?: {
    name: string;
    avatarUrl?: string;
  };
  reviewId?: number;
  tradeId: number;
}

export interface UserAuctionLikeItemType extends BaseUserItemType {
  status: UserTradeStatusType;
}

export interface UserRecentlyViewedItemType extends BaseUserItemType {
  status: UserTradeStatusType;
}
