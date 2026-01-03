import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AuctionListScreen from "@/screens/auction/auction-list";
import { parseFilters } from "@/screens/auction/auction-list/model/parse-filters";
import { searchAuctionsQuery } from "@/screens/auction/auction-list/model/search-auctions-query";
import type { SearchParamsType } from "@/screens/auction/auction-list/model/types";
import { getQueryClient } from "@/shared/api/query-client";

interface PageProps {
  searchParams: Promise<SearchParamsType>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = parseFilters(params);

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(searchAuctionsQuery(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuctionListScreen />
    </HydrationBoundary>
  );
}
