import Image from "next/image";
import Link from "next/link";

import LiveBadge from "@/entities/auction/ui/auction-badge/live-badge";
import UpcomingBadge from "@/entities/auction/ui/auction-badge/upcoming-badge";
import { VARIANT_CONFIG } from "@/entities/auction/ui/auction-item-card/model/constants";
import { AuctionCardVariantType } from "@/entities/auction/ui/auction-item-card/model/types";
import AuctionPrice from "@/entities/auction/ui/auction-item-card/ui/auction-price";
import AuctionTimer from "@/entities/auction/ui/auction-item-card/ui/auction-timer";
import CtaButton from "@/entities/auction/ui/auction-item-card/ui/cta-button";
import LikeButton from "@/entities/auction/ui/auction-item-card/ui/like-button";
import RankingBadge from "@/entities/auction/ui/auction-item-card/ui/ranking-badge";
import UpcomingInfo from "@/entities/auction/ui/auction-item-card/ui/upcoming-info";

export interface AuctionItemCardProps {
  variant: AuctionCardVariantType;
  auctionId: number;
  imageUrl: string;
  title: string;
  startPrice: number;
  currentPrice?: number;
  discountRate?: number;
  isLiked: boolean;
  startedAt: string;
  rank?: number;
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
}: AuctionItemCardProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <article className="bg-card h-fit w-full overflow-hidden rounded-xl border shadow-sm select-none">
      <Link href={`/auctions/${auctionId}`}>
        <div className="relative aspect-square">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
          {config.badge === "ranking" && rank != null && <RankingBadge rank={rank} />}
          {config.badge === "live" && <LiveBadge />}
          {config.badge === "upcoming" && <UpcomingBadge />}
          {config.like && <LikeButton isLiked={isLiked} />}
        </div>

        <div className="flex flex-col gap-4 p-4">
          <h3 className="text-base font-medium">{title}</h3>

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

          {config.timer && <AuctionTimer type={config.timer} time="3분" />}
        </div>
      </Link>

      {config.cta && (
        <div className="w-full px-4 pb-4">
          <CtaButton type={config.cta} />
        </div>
      )}
    </article>
  );
}
