import { AuctionTimerType } from "./ui/auction-timer";
import { CtaButtonType } from "./ui/cta-button";

export type AuctionCardVariant = "live" | "ranking" | "upcoming" | "compact";

export type AuctionCardBadge = "live" | "ranking" | "upcoming" | null;
export type AuctionCardContent = "auction" | "upcoming" | null;
export type AuctionCardCta = CtaButtonType | null;
export type AuctionCardTimer = AuctionTimerType | null;

export interface AuctionCardVariantConfig {
  badge: AuctionCardBadge;
  like: boolean;
  content: AuctionCardContent;
  timer: AuctionCardTimer;
  cta: AuctionCardCta;
}

export const VARIANT_MAP: Record<AuctionCardVariant, AuctionCardVariantConfig> = {
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
