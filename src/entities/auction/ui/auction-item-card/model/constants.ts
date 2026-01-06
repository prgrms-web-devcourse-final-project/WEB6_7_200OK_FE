import { type AuctionPublicStatusType } from "@/entities/auction/model/status";
import {
  AuctionCardVariant,
  type AuctionCardVariantType,
} from "@/entities/auction/ui/auction-item-card/model/types";

export const VARIANT_CONFIG: Record<AuctionCardVariantType, AuctionCardVariant> = {
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
  ended: {
    badge: null,
    like: false,
    content: "auction",
    timer: "ended",
    cta: "ended",
  },
} as const;

export const STATUS_TO_VARIANT_MAP: Record<AuctionPublicStatusType, AuctionCardVariantType> = {
  SCHEDULED: "upcoming",
  PROCESS: "live",
  COMPLETED: "ended",
};
