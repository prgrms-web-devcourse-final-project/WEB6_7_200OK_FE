export interface ItemFormSubmitData {
  productName: string;
  category: string;
  description: string;
  tags: string[];
  startPrice: number;
  stopLossPrice: number;
  dropPrice: number;
  auctionStartDate: Date;
}

export interface ItemFormState {
  // 기본 정보
  productName: string;
  category: string;
  description: string;
  // 이미지
  images: import("@/entities/auction").ItemImage[];
  // 태그
  tags: string[];
  // 가격
  startPrice: number | null;
  stopLossPrice: number | null;
  dropPrice: number | null;
  // 에러
  startPriceError: string;
  stopLossError: string;
  dropPriceError: string;
  // 날짜/시간
  selectedDate: Date | null;
  selectedTime: import("@/entities/date-modal").TimeSelection | null;
  isDateTimeModalOpen: boolean;
  formValid: boolean;
}
