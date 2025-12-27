import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { auctionsQuery } from "@/screens/main/model/auctions-query";
import AuctionsClient from "@/screens/main/ui/auctions-client";

export async function Auctions() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(auctionsQuery);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuctionsClient />
    </HydrationBoundary>
  );
}
