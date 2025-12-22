export const ROUTES = {
  main: "/",
  auctions: "/auctions",
  auctionDetail: (id: number | string) => `/auctions/${id}`,
  // TODO: 해당 페이지 경로 수정 후 라우트 수정 예정
  auctionCreate: "/auctions/create",
  login: "/auth/login",
  notification: "/notifications",
  search: "/search",
  payment: "/payments",
  // TODO: User Profile 페이지 엔드포인트 불확실로 미개입
} as const;
