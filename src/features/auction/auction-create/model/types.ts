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
