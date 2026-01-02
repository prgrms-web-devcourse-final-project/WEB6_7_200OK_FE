import type { AuctionStatusType } from "@/entities/auction";

export const PURCHASE_BUTTON_LABEL: Record<AuctionStatusType, string> = {
  PROCESS: "구매하기",
  CANCELED: "거래 취소된 상품입니다",
  FAILED: "거래 실패된 상품입니다",
  SCHEDULED: "경매 예정",
  COMPLETED: "거래 완료된 상품입니다",
} as const;
