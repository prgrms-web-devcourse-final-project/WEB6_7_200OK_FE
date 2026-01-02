import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { searchAuctionsQuery } from "@/screens/auction/auction-list/model/search-auctions-query";
import { AuctionListParams } from "@/screens/auction/auction-list/model/types";
import AuctionList from "@/screens/auction/auction-list/ui/auction-list";
import AuctionListHeader from "@/screens/auction/auction-list/ui/auction-list-header";
import AuctionListToolbar from "@/screens/auction/auction-list/ui/auction-list-toolbar";
import { Container } from "@/shared/ui";
import { AuctionFiltersSidebar } from "@/widgets/auction/auction-filters";

export default async function AuctionListScreen({ params }: { params: AuctionListParams }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(searchAuctionsQuery(params));

  return (
    <Container className="flex flex-col gap-4">
      <AuctionListHeader />
      <AuctionListToolbar />
      <div className="flex gap-4">
        <AuctionFiltersSidebar />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AuctionList params={params} />
        </HydrationBoundary>
      </div>
    </Container>
  );
}
