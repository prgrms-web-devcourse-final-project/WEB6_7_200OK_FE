/**
 *
 * 채팅
 * CHAT_MESSAGE
 *
 * 경매 시작
 * AUCTION_START_WISHLIST
 *
 * 경매 유찰
 * AUCTION_FAILED_SELLER
 * AUCTION_FAILED_SUBSCRIBER
 *
 * 경매 낙찰
 * SALE_SUCCESS_SELLER
 * SALE_SUCCESS_SUBSCRIBER
 *
 * 가격 변동
 * STOP_LOSS_TRIGGERED
 * PRICE_DROP
 *
 * 결제 성공
 * PAYMENT_SUCCESS_BUYER
 *
 * 구매 확정
 * PURCHASE_CONFIRMED_SELLER
 *
 * 리뷰
 * REVIEW_REGISTERED
 *
 */

export type NotificationType =
  | "CHAT_MESSAGE"
  | "AUCTION_START_WISHLIST"
  | "AUCTION_FAILED_SELLER"
  | "AUCTION_FAILED_SUBSCRIBER"
  | "SALE_SUCCESS_SELLER"
  | "SALE_SUCCESS_SUBSCRIBER"
  | "STOP_LOSS_TRIGGERED"
  | "PRICE_DROP"
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
