export type AuctionCardVariantType = "live" | "ranking" | "upcoming" | "compact" | "ended";

export type AuctionCardBadgeType = "live" | "ranking" | "upcoming" | null;

export type AuctionCardContentType = "auction" | "upcoming" | null;

export type AuctionCardCtaButtonType = "buy" | "notify" | "ended" | null;

export type AuctionCardTimerType = "drop" | "start" | "ended" | null;

export interface AuctionCardVariant {
  badge: AuctionCardBadgeType;
  like: boolean;
  content: AuctionCardContentType;
  timer: AuctionCardTimerType;
  cta: AuctionCardCtaButtonType;
}
