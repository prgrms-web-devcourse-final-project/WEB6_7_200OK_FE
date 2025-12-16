export interface NotificationPreferenceItem {
  id: string;
  status: "판매중" | "판매 완료" | "경매 예정" | "경매 종료";
  name: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  date: string;
  imageUrl?: string;
  keywords: string[];
}
