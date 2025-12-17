import { AuctionTimerType } from "@/entities/auction/ui/auction-card/ui/auction-timer";
import { CtaButtonType } from "@/entities/auction/ui/auction-card/ui/cta-button";

export type AuctionCardVariantType = "live" | "ranking" | "upcoming" | "compact";

export type AuctionCardBadgeType = "live" | "ranking" | "upcoming" | null;
export type AuctionCardContentType = "auction" | "upcoming" | null;
export type AuctionCardCtaType = CtaButtonType | null;
export type AuctionCardTimerType = AuctionTimerType | null;

export interface AuctionCardVariant {
  badge: AuctionCardBadgeType;
  like: boolean;
  content: AuctionCardContentType;
  timer: AuctionCardTimerType;
  cta: AuctionCardCtaType;
}
