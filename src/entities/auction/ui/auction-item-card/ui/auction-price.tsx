interface AuctionPriceProps {
  startPrice: number;
  currentPrice: number;
  discountRate: number;
}

export default function AuctionPrice({
  startPrice,
  currentPrice,
  discountRate,
}: AuctionPriceProps) {
  return (
    <dl className="grid grid-cols-2 items-center gap-y-1.5 text-sm">
      <dt className="text-muted-foreground">시작가</dt>
      <dd className="text-muted-foreground text-right line-through">
        {startPrice.toLocaleString()}원
      </dd>

      <dt className="text-muted-foreground">현재가</dt>
      <dd className="text-right">
        <span className="mr-2 font-semibold text-red-500">{discountRate}% ↓</span>
        <strong className="text-brand dark:text-brand-text text-base font-bold">
          {currentPrice.toLocaleString()}원
        </strong>
      </dd>
    </dl>
  );
}
