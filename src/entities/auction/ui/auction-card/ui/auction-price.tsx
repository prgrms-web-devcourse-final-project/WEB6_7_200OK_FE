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
      <dt className="text-zinc-600">시작가</dt>
      <dd className="text-right text-zinc-400 line-through">{startPrice.toLocaleString()}원</dd>

      <dt className="text-zinc-600">현재가</dt>
      <dd className="text-right">
        <span className="mr-2 font-semibold text-red-500">{discountRate}% ↓</span>
        <strong className="text-brand text-base font-bold">
          {currentPrice.toLocaleString()}원
        </strong>
      </dd>
    </dl>
  );
}
