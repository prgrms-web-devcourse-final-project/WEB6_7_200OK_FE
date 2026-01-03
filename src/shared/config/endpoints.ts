export const API_ENDPOINTS = {
  auctions: "/api/v1/auctions",
  auctionDetail: (auctionId: number | string) => `/api/v1/auctions/${auctionId}`,
  auctionLike: (auctionId: number | string) => `/api/v1/auctions/${auctionId}/like`,
  auctionSearch: "/api/v1/auctions/search",
  auctionHistory: (auctionId: number | string) => `/api/v1/auctions/${auctionId}/history`,
  auctionEmoji: (auctionId: number | string, emojiType: "LIKE" | "FIRE" | "SAD" | "SMILE") =>
    `/api/v1/auctions/${auctionId}/emojis/${emojiType}`,

  userInfo: (userid: number) => `/api/v1/users/${userid}`,

  tagSearch: "/api/v1/tags/search",

  chatRooms: "/api/v1/chat-rooms",
  chatRoom: (chatRoomId: number | string) => `/api/v1/chat-rooms/${chatRoomId}`,
  chatRoomMessages: (chatRoomId: number | string) => `/api/v1/chat-rooms/${chatRoomId}/messages`,
  chatRoomRead: (chatRoomId: number | string) => `/api/v1/chat-rooms/${chatRoomId}/messages/read`,

  auth: "/api/v1/auth",
  authValidateTokens: "/api/v1/auth/validate-tokens",
  authBasic: "/api/v1/auth/basic",
  authCallback: {
    naver: "/api/v1/auth/callback/naver",
    kakao: "/api/v1/auth/callback/kakao",
    google: "/api/v1/auth/callback/google",
  },
} as const;
