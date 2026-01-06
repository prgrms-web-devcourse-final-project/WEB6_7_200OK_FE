import { memo } from "react";

import Image from "next/image";
import Link from "next/link";

import { type AuctionType } from "@/entities/auction/model/types";
import { LiveBadge } from "@/entities/auction/ui/auction-badge/live-badge";
import { UpcomingBadge } from "@/entities/auction/ui/auction-badge/upcoming-badge";
import { VARIANT_CONFIG } from "@/entities/auction/ui/auction-item-card/model/constants";
import { type AuctionCardVariantType } from "@/entities/auction/ui/auction-item-card/model/types";
import AuctionEndTimer from "@/entities/auction/ui/auction-item-card/ui/auction-end-timer";
import AuctionPrice from "@/entities/auction/ui/auction-item-card/ui/auction-price";
import AuctionTimer from "@/entities/auction/ui/auction-item-card/ui/auction-timer";
import BuyCtaButton from "@/entities/auction/ui/auction-item-card/ui/buy-cta-button";
import CtaButton from "@/entities/auction/ui/auction-item-card/ui/cta-button";
import EndedCtaButton from "@/entities/auction/ui/auction-item-card/ui/ended-cta-button";
import { LikeButton } from "@/entities/auction/ui/auction-item-card/ui/like-button";
import RankingBadge from "@/entities/auction/ui/auction-item-card/ui/ranking-badge";
import UpcomingInfo from "@/entities/auction/ui/auction-item-card/ui/upcoming-info";
import { ROUTES } from "@/shared/config/routes";
import { ImageLabelOverlay } from "@/shared/ui";

export interface AuctionItemCardProps extends AuctionType {
  variant: AuctionCardVariantType;
  rank?: number;
}

function AuctionItemCardComponent({
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
}: AuctionItemCardProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <article className="bg-card h-fit w-full overflow-hidden rounded-xl border select-none">
      <Link href={ROUTES.auctionDetail(auctionId)}>
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 33vw, (min-width: 500px) 50vw, 100vw"
          />
          {variant === "ended" && <ImageLabelOverlay label="낙찰 완료" />}
          {config.badge === "ranking" && rank && <RankingBadge rank={rank} />}
          {config.badge === "live" && <LiveBadge />}
          {config.badge === "upcoming" && <UpcomingBadge />}
          {config.like && <LikeButton auctionId={auctionId} initIsLiked={isLiked} />}
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

          {config.timer === "ended" && <AuctionEndTimer />}
          {config.timer && config.timer !== "ended" && (
            <AuctionTimer type={config.timer} startedAt={startedAt} />
          )}
        </div>
      </Link>

      {config.cta && (
        <div className="w-full px-4 pb-4">
          {config.cta === "buy" && <BuyCtaButton href={ROUTES.auctionDetail(auctionId)} />}
          {config.cta === "notify" && <CtaButton type={config.cta} />}
          {config.cta === "ended" && <EndedCtaButton />}
        </div>
      )}
    </article>
  );
}

export const AuctionItemCard = memo(AuctionItemCardComponent);
AuctionItemCard.displayName = "AuctionItemCard";
