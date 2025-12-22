export function calcDiscountRate(start: number, current: number, digits = 0): number {
  if (!Number.isFinite(start) || !Number.isFinite(current) || start <= 0) return 0;

  const rate = ((start - current) / start) * 100;
  const factor = 10 ** digits;

  return Math.round(rate * factor) / factor;
}

export function calcPrevPriceFromDiscountRate(
  currentPrice: number,
  discountRate: number,
  step = 1
): number {
  if (!Number.isFinite(currentPrice) || !Number.isFinite(discountRate)) return 0;
  if (currentPrice < 0 || discountRate < 0 || discountRate >= 100) return 0;

  const raw = currentPrice / (1 - discountRate / 100);
  return Math.round(raw / step) * step;
}
