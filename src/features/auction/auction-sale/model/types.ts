export interface SellerType {
  // TODO: 추후 user profile type 수정
  sellerId: number;
  username: string;
  profileImageUrl?: string;
  rating: number;
  reviewCount: number;
}
