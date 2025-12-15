export type TradeStatus = "판매중" | "판매 완료" | "경매 예정" | "경매 종료";
export type PurchaseStatus = "구매 완료" | "구매 확정";

export interface BaseItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  date: string;
  imageUrl?: string;
}

export interface SellingItem extends BaseItem {
  status: TradeStatus;
  unreadMessageCount?: number;
}

export interface PurchaseItem extends BaseItem {
  status: PurchaseStatus;
  unreadMessageCount?: number;
  hasReview?: boolean;
  seller?: {
    name: string;
    avatarUrl?: string;
  };
}

export interface WatchlistItem extends BaseItem {
  status: TradeStatus;
}

export interface RecentlyViewedItem extends BaseItem {
  status: TradeStatus;
}

export interface Review {
  id: string;
  date: string;
  rating: number;
  content: string;
  reviewer: {
    name: string;
    avatarUrl?: string;
  };
  product: {
    name: string;
    imageUrl?: string;
  };
  seller?: {
    name: string;
    avatarUrl?: string;
  };
}
