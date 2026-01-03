import Image from "next/image";
import Link from "next/link";

import { AuctionType } from "@/entities/auction/model/types";
import { LiveBadge } from "@/entities/auction/ui/auction-badge/live-badge";
import { UpcomingBadge } from "@/entities/auction/ui/auction-badge/upcoming-badge";
import { VARIANT_CONFIG } from "@/entities/auction/ui/auction-item-card/model/constants";
import { AuctionCardVariantType } from "@/entities/auction/ui/auction-item-card/model/types";
import AuctionPrice from "@/entities/auction/ui/auction-item-card/ui/auction-price";
import AuctionTimer from "@/entities/auction/ui/auction-item-card/ui/auction-timer";
import BuyCtaButton from "@/entities/auction/ui/auction-item-card/ui/buy-cta-button";
import CtaButton from "@/entities/auction/ui/auction-item-card/ui/cta-button";
import LikeButton from "@/entities/auction/ui/auction-item-card/ui/like-button";
import RankingBadge from "@/entities/auction/ui/auction-item-card/ui/ranking-badge";
import UpcomingInfo from "@/entities/auction/ui/auction-item-card/ui/upcoming-info";
import { ROUTES } from "@/shared/config/routes";

export interface AuctionItemCardProps extends AuctionType {
  variant: AuctionCardVariantType;
  rank?: number;
  onExpire?: () => void;
}

export function AuctionItemCard({
  variant,
  auctionId,
  imageUrl,
  title,
  startPrice,
  currentPrice,
  discountRate,
  isLiked,
  startedAt,
  rank,
  onExpire,
}: AuctionItemCardProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <article className="bg-card h-fit w-full overflow-hidden rounded-xl border select-none">
      <Link href={ROUTES.auctionDetail(auctionId)}>
        <div className="relative aspect-square">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
          {config.badge === "ranking" && rank != null && <RankingBadge rank={rank} />}
          {config.badge === "live" && <LiveBadge />}
          {config.badge === "upcoming" && <UpcomingBadge />}
          {config.like && <LikeButton auctionId={auctionId} isLiked={isLiked} />}
        </div>

        <div className="flex flex-col gap-4 p-4">
          <h3 className="truncate font-medium">{title}</h3>

          {config.content === "auction" && (
            <AuctionPrice
              startPrice={startPrice}
              currentPrice={currentPrice ?? startPrice}
              discountRate={discountRate ?? 0}
            />
          )}

          {config.content === "upcoming" && (
            <UpcomingInfo startedAt={startedAt} startPrice={startPrice} />
          )}

          {config.timer && (
            <AuctionTimer type={config.timer} startedAt={startedAt} onExpire={onExpire} />
          )}
        </div>
      </Link>

      {config.cta && (
        <div className="w-full px-4 pb-4">
          {config.cta === "buy" && <BuyCtaButton href={ROUTES.auctionDetail(auctionId)} />}
          {config.cta === "notify" && <CtaButton type={config.cta} />}
        </div>
      )}
    </article>
  );
}
