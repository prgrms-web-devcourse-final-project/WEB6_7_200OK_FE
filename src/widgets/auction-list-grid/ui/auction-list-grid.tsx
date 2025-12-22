import { AuctionItemCard } from "@/entities/auction";
import { AuctionType } from "@/entities/auction/model/types";
import { Container } from "@/shared/ui";

export function AuctionListGrid({ items }: { items: AuctionType[] }) {
  return (
    <main>
      <Container>
        <ul className="grid grid-cols-3 gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item: AuctionType) => (
            <li key={item.auctionId}>
              <AuctionItemCard
                {...item}
                // TODO: 판매 완료 처리
                variant={item.status === "SCHEDULED" ? "upcoming" : "live"}
                currentPrice={item.currentPrice ?? item.startPrice}
                discountRate={item.discountRate ?? 0}
              />
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
