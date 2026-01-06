import { AuctionItemCard } from "@/entities/auction";
import { AuctionType } from "@/entities/auction/model/types";

export function AuctionGrid({ items }: { items: AuctionType[] }) {
  return (
    <section className="w-full">
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.auctionId}>
            <AuctionItemCard
              {...item}
              // TODO: status 타입 좁히기 및 completed 카드 UI 작업
              variant={item.status === "SCHEDULED" ? "upcoming" : "live"}
              currentPrice={item.currentPrice}
              discountRate={item.discountRate}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
