export const SECTIONS = [
  {
    key: "popularList",
    title: "🔥 실시간 인기 랭킹",
    description: "가장 인기있는 상품 모아보기!",
    variant: "ranking",
    moreHref: null,
  },
  {
    key: "processList",
    title: "⚡ 경매 진행 중",
    description: "실시간 경매가 진행 중인 상품을 모아봤어요!",
    variant: "live",
    moreHref: "#",
  },
  {
    key: "scheduledList",
    title: "⏳ 경매 진행 예정",
    description: "경매가 곧 진행될 거예요!",
    variant: "upcoming",
    moreHref: "#",
  },
] as const;
