import { AuctionItemCard } from "@/entities/auction";
import { AuctionType } from "@/entities/auction/model/types";

export function AuctionGrid({ items }: { items: AuctionType[] }) {
  return (
    <main>
      <ul className="grid grid-cols-3 gap-2 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <li key={item.auctionId}>
            <AuctionItemCard
              {...item}
              // TODO: status 타입 좁히기 및 completed 카드 UI 작업
              variant={item.status === "SCHEDULED" ? "upcoming" : "live"}
              currentPrice={item.currentPrice}
              discountRate={item.discountRate}
              // FIXME: 임시 처리
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
