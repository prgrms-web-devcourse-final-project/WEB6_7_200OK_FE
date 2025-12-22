/*
SCHEDULED("경매 예정"),
PROCESS("경매 진행 중"),
COMPLETED("낙찰 완료"),
FAILED("유찰"),
CANCELED("경매 취소");
*/
export type AuctionStatusType = "SCHEDULED" | "PROCESS" | "COMPLETED" | "FAILED" | "CANCELED";

export interface AuctionItemType {
  auctionId: number;
  imageUrl: string;
  title: string;
  isLiked: boolean;
  startedAt: string;
}

export interface AuctionPriceType {
  startPrice: number;
  currentPrice?: number;
  discountRate?: number;
  stopLoss?: number;
}

export type AuctionType = AuctionItemType & AuctionPriceType;
