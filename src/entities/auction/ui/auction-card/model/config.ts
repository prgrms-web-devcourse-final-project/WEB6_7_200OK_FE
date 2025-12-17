import {
  AuctionCardVariant,
  AuctionCardVariantType,
} from "@/entities/auction/ui/auction-card/model/types";

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
} as const;
