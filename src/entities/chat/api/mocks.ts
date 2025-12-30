import type { Chat, Message } from "@/features/chat";

export const mockChats: Chat[] = [
  {
    id: "1",
    name: "박판매",
    avatar: "/shared/assets/images/chat/avatar.svg",
    lastMessage: "현재는 계획이 없는데, 나중에 있으면 말씀드릴게요!",
    lastMessageTime: "오전 10:37",
    unreadCount: 3,
    product: {
      id: "1",
      name: "소니 WH-1000XM5 헤드폰",
      image: "/shared/assets/images/chat/sony.svg",
      price: 280000,
      purchaseDate: "2024.11.30",
    },
  },
  {
    id: "2",
    name: "박판매",
    avatar: "/shared/assets/images/chat/avatar.svg",
    lastMessage: "현재는 계획이 없는데, 나중에 있으면 말씀드릴게요!",
    lastMessageTime: "오전 10:37",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "박판매",
    avatar: "/shared/assets/images/chat/avatar.svg",
    lastMessage: "현재는 계획이 없는데, 나중에 있으면 말씀드릴게요!",
    lastMessageTime: "오전 10:37",
    unreadCount: 1,
  },
];

export const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      message: "안녕하세요! 구매해주셔서 감사합니다.",
      time: "오전 10:30",
      isMine: false,
      isRead: true,
    },
    {
      id: "2",
      message: "네, 잘 받았습니다. 상품 상태 좋네요!",
      time: "오전 10:32",
      isMine: true,
      isRead: true,
    },
    {
      id: "3",
      message: "만족하셨다니 다행입니다",
      time: "오전 10:33",
      isMine: false,
      isRead: true,
    },
    {
      id: "4",
      message: "혹시 다음에 같은 제품 또 판매하실 계획 있으신가요?",
      time: "오전 10:35",
      isMine: true,
      isRead: true,
    },
    {
      id: "5",
      message: "현재는 계획이 없는데, 나중에 있으면 말씀드릴게요!",
      time: "오전 10:37",
      isMine: false,
      isRead: false,
    },
    {
      id: "6",
      message: "테스트 메시지",
      time: "오전 10:37",
      isMine: true,
      isRead: true,
    },
    {
      id: "7",
      message: "테스트 메시지",
      time: "오전 10:37",
      isMine: false,
      isRead: false,
    },
    {
      id: "8",
      message: "테스트 메시지",
      time: "오전 10:37",
      isMine: true,
      isRead: false,
    },
  ],
};
