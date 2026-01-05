import { AuctionFiltersSidebar } from "@/features/auction/filters";
import AuctionList from "@/screens/auction/auction-list/ui/auction-list";
import AuctionListHeader from "@/screens/auction/auction-list/ui/auction-list-header";
import AuctionListToolbar from "@/screens/auction/auction-list/ui/auction-list-toolbar";
import { Container } from "@/shared/ui";

export default function AuctionListScreen() {
  return (
    <Container className="flex flex-col gap-4">
      <AuctionListHeader />
      <AuctionListToolbar />
      <div className="flex gap-4">
        <AuctionFiltersSidebar />
        <AuctionList />
      </div>
    </Container>
  );
}
