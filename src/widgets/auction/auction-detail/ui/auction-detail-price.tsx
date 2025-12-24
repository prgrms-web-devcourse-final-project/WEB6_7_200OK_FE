"use client";

import { formatPriceKRW } from "@/shared/lib/utils/price/formatPriceKRW";
import { useAuctionPriceStore } from "@/widgets/auction/auction-detail/hooks/auction-price-store-provider";

interface AuctionDetailPriceProps {
  startPrice: number;
}

export default function AuctionDetailPrice({ startPrice }: AuctionDetailPriceProps) {
  const price = useAuctionPriceStore((state) => state.price);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground text-base font-medium">
        판매 시작가 {formatPriceKRW(startPrice)}원
      </span>
      <span className="text-4xl font-semibold">{formatPriceKRW(price)}원</span>
    </div>
  );
}
