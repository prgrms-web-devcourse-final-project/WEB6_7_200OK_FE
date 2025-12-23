import { AuctionItemCard } from "@/entities/auction";
import { AuctionType } from "@/entities/auction/model/types";
import { Container } from "@/shared/ui";

export function AuctionListGrid({ items }: { items: AuctionType[] }) {
  return (
    <main>
      <Container>
        <ul className="grid grid-cols-3 gap-2 lg:grid-cols-4 xl:grid-cols-5">
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
      </Container>
    </main>
  );
}
