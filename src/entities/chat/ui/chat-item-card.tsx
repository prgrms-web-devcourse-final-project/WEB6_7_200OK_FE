import Image from "next/image";

import { dayjs } from "@/shared/lib/utils/dayjs";
import { formatPriceKRW } from "@/shared/lib/utils/price/formatPriceKRW";

interface ChatItemCardProps {
  auction: {
    title: string;
    imageUrl: string;
  };
  trade: {
    finalPrice: number;
    purchasedAt: string;
  };
}

export function ChatItemCard({ auction, trade }: ChatItemCardProps) {
  const formattedPrice = trade.finalPrice ? formatPriceKRW(trade.finalPrice) : null;
  const formattedDate = trade.purchasedAt ? dayjs(trade.purchasedAt).format("YYYY-MM-DD") : null;

  return (
    <div className="flex gap-3 sm:gap-4">
      <Image
        src={auction.imageUrl}
        alt={auction.title}
        width={128}
        height={128}
        className="size-20 shrink-0 rounded-md object-cover sm:size-28 md:size-32"
      />
      <div className="flex flex-1 flex-col justify-center">
        <p className="mb-1.5 line-clamp-2 text-sm font-medium sm:mb-3 sm:text-base">
          {auction.title}
        </p>
        <div className="space-y-1 sm:space-y-2">
          {formattedPrice && (
            <p
              className="text-sm sm:text-base dark:text-[oklch(0.65_0.2_145)]"
              style={{ color: "oklch(0.55 0.2 145)" }}
            >
              구매가: {formattedPrice}
            </p>
          )}
          {formattedDate && (
            <p className="text-foreground text-sm sm:text-base">구매일: {formattedDate}</p>
          )}
        </div>
      </div>
    </div>
  );
}
