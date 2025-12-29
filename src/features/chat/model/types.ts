export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  product?: Product;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  purchaseDate: string;
}

export interface Message {
  id: string;
  message: string;
  time: string;
  isMine: boolean;
  isRead: boolean;
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
  partner: ChatRoomPartner;
  auction: ChatRoomAuction;
  lastMessage: ChatRoomLastMessage;
  unreadCount: number;
}

export interface ChatRoomListResponse {
  data: ChatRoomListItem[];
}
