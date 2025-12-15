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
  // [추가] 판매자 정보 필드 추가
  seller?: {
    name: string;
    avatarUrl?: string;
  };
}
