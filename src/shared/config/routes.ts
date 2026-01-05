export const ROUTES = {
  main: "/",
  auctions: "/auctions",
  auctionDetail: (id: number | string) => `/auctions/${id}`,
  auctionCreate: "/auctions/create",
  login: "/auth/login",
  notification: "/notifications",
  search: "/search",
  payment: "/payments",
  myPage: "/users/me",
  userReview: (sellerId: number | string) => `/users/${sellerId}/reviews`,
} as const;
