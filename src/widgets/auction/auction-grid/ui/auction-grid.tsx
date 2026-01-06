import { memo } from "react";

import { AuctionItemCard } from "@/entities/auction";
import { type AuctionListType } from "@/entities/auction/model/types";
import { STATUS_TO_VARIANT_MAP } from "@/entities/auction/ui/auction-item-card/model/constants";

function AuctionGridComponent({ items }: { items: AuctionListType[] }) {
  return (
    <section className="w-full">
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.auctionId}>
            <AuctionItemCard
              {...item}
              variant={STATUS_TO_VARIANT_MAP[item.status]}
              currentPrice={item.currentPrice}
              discountRate={item.discountRate}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export const AuctionGrid = memo(AuctionGridComponent);
AuctionGrid.displayName = "AuctionGrid";
