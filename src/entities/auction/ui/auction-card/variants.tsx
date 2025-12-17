import { AuctionTimerType } from "./ui/auction-timer";
import { CtaButtonType } from "./ui/cta-button";

export type AuctionCardVariantType = "live" | "ranking" | "upcoming" | "compact";

export type AuctionCardBadgeType = "live" | "ranking" | "upcoming" | null;
export type AuctionCardContentType = "auction" | "upcoming" | null;
export type AuctionCardCtaType = CtaButtonType | null;
export type AuctionCardTimerType = AuctionTimerType | null;

export interface AuctionCardVariantConfig {
  badge: AuctionCardBadgeType;
  like: boolean;
  content: AuctionCardContentType;
  timer: AuctionCardTimerType;
  cta: AuctionCardCtaType;
}

export const VARIANT_MAP: Record<AuctionCardVariantType, AuctionCardVariantConfig> = {
  ranking: {
    badge: "ranking",
    like: true,
    content: "auction",
    timer: null,
    cta: null,
  },
  live: {
    badge: "live",
    like: true,
    content: "auction",
    timer: "drop",
    cta: "buy",
  },
  upcoming: {
    badge: "upcoming",
    like: true,
    content: "upcoming",
    timer: "start",
    cta: "notify",
  },
  compact: {
    badge: null,
    like: false,
    content: null,
    timer: null,
    cta: null,
  },
} as const;
