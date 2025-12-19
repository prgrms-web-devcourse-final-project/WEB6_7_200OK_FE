export interface ReviewType {
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
  seller?: {
    name: string;
    avatarUrl?: string;
  };
}
