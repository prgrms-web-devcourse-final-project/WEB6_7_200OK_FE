export const API_ENDPOINTS = {
  auctions: "/api/v1/auctions",
  auctionDetail: (auctionId: number | string) => `/api/v1/auctions/${auctionId}`,
  auctionLike: (auctionId: number | string) => `/api/v1/auctions/${auctionId}/like`,
  auctionSearch: "/api/v1/auctions/search",
  auctionHistory: (auctionId: number | string) => `/api/v1/auctions/${auctionId}/history`,
  auctionEmoji: (auctionId: number | string, emojiType: "LIKE" | "FIRE" | "SAD" | "SMILE") =>
    `/api/v1/auctions/${auctionId}/emojis/${emojiType}`,
  auctionSellerInfo: (sellerId: number | string) => `/api/v1/auctions/${sellerId}/seller`,
  auctionNotificationSetting: (auctionId: string | number) =>
    `/api/v1/auctions/${auctionId}/notification-settings`,
  auctionNotificationSettingStart: (auctionId: string | number) =>
    `/api/v1/auctions/${auctionId}/notification-settings/start`,
  auctionRecentView: (auctionId: number | string) => `/api/v1/recentview/${auctionId}`,

  userInfo: (userid: number) => `/api/v1/users/${userid}`,
  userImageUpdate: "/api/v1/users/images", // PUT, Multipart
  userNameUpdate: "/api/v1/users/names", // PUT, JSON
  userSales: (userId: number) => `/api/v1/users/${userId}/sales`,
  userReviews: (userId: number) => `/api/v1/users/${userId}/reviews`,

  // 리뷰 생성, 수정 및 삭제 API
  reviews: "/api/v1/reviews",
  reviewDetail: (reviewId: number) => `/api/v1/reviews/${reviewId}`,

  // 마이페이지 관련 API
  myPurchases: "/api/v1/me/purchases",
  purchaseConfirm: (tradeId: number) => `/api/v1/trades/${tradeId}/confirm`,
  myLikes: "/api/v1/me/likes",
  removeMyLike: (auctionId: number) => `/api/v1/auctions/${auctionId}/like`,
  myNotifications: "/api/v1/me/notifications",
  myRecentViews: "/api/v1/me/recentviews",
  deleteRecentView: (recentViewId: number) => `/api/v1/recentview/${recentViewId}`,

  notifications: "/api/v1/notifications",
  notificationsSubscribe: "/api/v1/notifications/subscribe",
  notificationsReadAll: "/api/v1/notifications",
  notificationsRead: (notificationId: number) => `/api/v1/notifications/${notificationId}`,

  tagSearch: "/api/v1/tags/search",
  searchHistory: "/api/v1/searches",

  // 채팅 API
  chatRooms: "/api/v1/chat-rooms",
  chatRoom: (chatRoomId: number | string) => `/api/v1/chat-rooms/${chatRoomId}`,
  chatRoomMessages: (chatRoomId: number | string) => `/api/v1/chat-rooms/${chatRoomId}/messages`,
  chatRoomRead: (chatRoomId: number | string) => `/api/v1/chat-rooms/${chatRoomId}/messages/read`,
  chatImages: "/api/v1/chat-images",
  auctionImages: "/api/v1/auction-images",

  // 채팅 웹소켓
  wsStomp: "/ws-stomp",
  wsChatSend: "/app/chat.send",
  wsChatRead: "/app/chat.read",
  wsUserQueueChatRooms: "/user/queue/chat.rooms",
  wsUserQueueErrors: "/user/queue/errors",
  wsChatRoom: (chatRoomId: number | string) => `/topic/chat.rooms.${chatRoomId}`,
  wsRealTimeRead: (chatRoomId: number | string) => `/topic/chat.read.${chatRoomId}`,

  auth: "/api/v1/auth",
  authValidateTokens: "/api/v1/auth/validate-tokens",
  authBasic: "/api/v1/auth/basic",
  authCallback: {
    naver: "/api/v1/auth/callback/naver",
    kakao: "/api/v1/auth/callback/kakao",
    google: "/api/v1/auth/callback/google",
  },
} as const;
