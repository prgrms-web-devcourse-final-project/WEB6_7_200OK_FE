export interface ReviewType {
  id: number;
  reviewer: {
    id: number;
    name: string;
    avatarUrl?: string;
  };
  date: string;
  rating: number;
  content: string;
  product: {
    id: number;
    name: string;
    imageUrl?: string;
  };
  seller: {
    id: number;
    name: string;
    avatarUrl?: string;
  };
}
