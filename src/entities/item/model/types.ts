export interface SellingItem {
  id: string;
  status: "판매중" | "판매 완료" | "경매 예정" | "경매 종료";
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  date: string;
  imageUrl?: string;
  unreadMessageCount?: number;
}

export interface PurchaseItem {
  id: string;
  status: "구매 완료" | "구매 확정";
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  date: string;
  imageUrl?: string;
  unreadMessageCount?: number;
  hasReview?: boolean;
  seller?: {
    name: string;
    avatarUrl?: string;
  };
}

export interface Review {
  id: string;
  reviewer: {
    name: string;
    avatarUrl?: string;
  };
  date: string;
  rating: number;
  content: string;
  product: {
    name: string;
    imageUrl?: string;
  };
}

export interface WatchlistItem {
  id: string;
  status: "판매중" | "판매 완료" | "경매 예정" | "경매 종료";
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  date: string;
  imageUrl?: string;
}

export interface RecentlyViewedItem {
  id: string;
  status: "판매중" | "판매 완료" | "경매 예정" | "경매 종료";
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  date: string;
  imageUrl?: string;
}
