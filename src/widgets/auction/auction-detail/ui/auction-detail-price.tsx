import { formatPriceKRW } from "@/shared/lib/utils/price/formatPriceKRW";

interface AuctionDetailPriceProps {
  startPrice: number;
  currentPrice: number;
}

export default function AuctionDetailPrice({ startPrice, currentPrice }: AuctionDetailPriceProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground text-base font-medium">
        판매 시작가 {formatPriceKRW(startPrice)}원
      </span>
      <span className="text-4xl font-semibold">{formatPriceKRW(currentPrice)}원</span>
    </div>
  );
}
