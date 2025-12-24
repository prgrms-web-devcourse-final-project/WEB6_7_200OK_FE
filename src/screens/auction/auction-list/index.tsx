import { getAuctions } from "@/screens/auction/auction-list/api/getAuctions";
import { Container } from "@/shared/ui";
import { AuctionFiltersSidebar } from "@/widgets/auction/auction-filters";
import { AuctionGrid } from "@/widgets/auction/auction-grid";

export default async function AuctionListScreen() {
  const data = await getAuctions();

  return (
    <main>
      <Container className="flex gap-4">
        <AuctionFiltersSidebar />
        <AuctionGrid items={data.slice} />;
      </Container>
    </main>
  );
}
