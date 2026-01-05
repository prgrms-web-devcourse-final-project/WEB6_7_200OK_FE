export interface ChatInfo {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  product?: ProductInfo;
}

export interface ProductInfo {
  id: string;
  name: string;
  image: string;
  price: number;
  purchaseDate: string;
}

export interface ChatMessage {
  messageId: number;
  senderId: number;
  isMine: boolean;
  messageType: "TEXT" | "IMAGE" | "SYSTEM";
  content: string;
  imageUrls: string[];
  isRead: boolean;
  createdAt: string;
}

export type ListFilter = "ALL" | "BUY" | "SELL";

export interface ChatRoomPartner {
  partnerId: number;
  username: string;
  profileImageUrl: string;
}

export interface ChatRoomAuction {
  auctionId: number;
  title: string;
  imageUrl: string;
}

export type LastMessageType = "TEXT" | "IMAGE";

export interface ChatRoomLastMessage {
  lastMessageAt: string;
  preview: string;
  type: LastMessageType;
}

export interface ChatRoomListItem {
  chatRoomId: number;
  tradeId: number;
  partner?: ChatRoomPartner;
  auction?: ChatRoomAuction;
  lastMessage?: ChatRoomLastMessage;
  unreadCount: number;
}

export interface ChatRoomTradeInfo {
  tradeId: number;
  finalPrice: number;
  purchasedAt: string;
}

export interface WebSocketResponse {
  code: string;
  message: string;
  timestamp: Date;
}

export const WS_STOMP_ERROR_CODES = {
  AUTH_REQUIRED: "WS_AUTH_REQUIRED",
  TOKEN_INVALID: "WS_TOKEN_INVALID",
  TOKEN_EXPIRED: "WS_TOKEN_EXPIRED",
  TOKEN_MISSING: "WS_TOKEN_MISSING",
} as const;

export type WsErrorCode = (typeof WS_STOMP_ERROR_CODES)[keyof typeof WS_STOMP_ERROR_CODES];

export const WS_QUEUE_ERROR_CODES = {
  FORBIDDEN_CHAT_ROOM: "FORBIDDEN_CHAT_ROOM",
  INVALID_TRADE_STATUS_FOR_CHAT: "INVALID_TRADE_STATUS_FOR_CHAT",
  NOT_FOUND_CHAT_ROOM: "NOT_FOUND_CHAT_ROOM",
} as const;

export type WsQueueErrorCode = (typeof WS_QUEUE_ERROR_CODES)[keyof typeof WS_QUEUE_ERROR_CODES];

export interface ChatReadEvent {
  chatRoomId: number;
  readerId: number;
  lastReadMessageId: number;
  readAt: string;
}
