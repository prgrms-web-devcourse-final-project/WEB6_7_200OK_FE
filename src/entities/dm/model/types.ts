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

export type ListFilter = "all" | "purchase" | "sale";
