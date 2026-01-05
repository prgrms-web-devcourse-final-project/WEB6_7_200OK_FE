export const AUCTION_STATUS = {
  PROCESS: "진행 중",
  SCHEDULED: "예정",
  COMPLETED: "종료",
  FAILED: "실패",
  CANCELED: "취소",
} as const;

export type AuctionStatusType = keyof typeof AUCTION_STATUS;

export const AUCTION_PUBLIC_STATUS_KEYS = ["PROCESS", "SCHEDULED", "COMPLETED"] as const;

export type AuctionPublicStatusType = (typeof AUCTION_PUBLIC_STATUS_KEYS)[number];

export const AUCTION_STATUS_FILTER_KEYS = ["ALL", ...AUCTION_PUBLIC_STATUS_KEYS] as const;

export const AUCTION_STATUS_FILTER = {
  ALL: "전체",
  ...AUCTION_STATUS,
} as const;

export type AuctionStatusFilterValueType = (typeof AUCTION_STATUS_FILTER_KEYS)[number];
