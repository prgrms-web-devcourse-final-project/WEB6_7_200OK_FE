/**
 *
 *  CHAT_MESSAGE 채팅 알림
 *  AUCTION_START_WISHLIST 거래 시작
 *  AUCTION_FAILED_SELLER 거래 유찰 (판매자)
 *  AUCTION_FAILED_BUYER 거래 유찰 (구매자)
 *  AUCTION_ENDED_OTHER 남의 물건 경매 종료
 *  STOP_LOSS_TRIGGERED 스탑 로스 발생 (X)
 *  PRICE_DROP 가격 하락
 *  SALE_SUCCESS_SELLER 판매 성공 (판매자)
 *  PAYMENT_SUCCESS_BUYER 결제 성공 (구매자) (X)
 *  PURCHASE_CONFIRMED_SELLER 구매 확정 (판매자)
 *  REVIEW_REGISTERED 리뷰 등록
 */

export type NotificationType =
  | "CHAT_MESSAGE"
  | "AUCTION_START_WISHLIST"
  | "AUCTION_FAILED_SELLER"
  | "AUCTION_FAILED_BUYER"
  | "AUCTION_ENDED_OTHER"
  | "STOP_LOSS_TRIGGERED"
  | "PRICE_DROP"
  | "SALE_SUCCESS_SELLER"
  | "PAYMENT_SUCCESS_BUYER"
  | "PURCHASE_CONFIRMED_SELLER"
  | "REVIEW_REGISTERED"
  | (string & {});

export type NotificationTarget = "chatRoom" | "auction" | "payment" | "review" | (string & {});

export interface NotificationItem {
  notificationId: number;
  type: NotificationType;
  title: string;
  message: string;
  readStatus: boolean;
  target: NotificationTarget;
  targetId: number;
  notificationAt: string;
}
