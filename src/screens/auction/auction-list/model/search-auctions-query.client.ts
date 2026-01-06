import { infiniteQueryOptions } from "@tanstack/react-query";

import { type AuctionFilters } from "@/features/auction/filters/model/types";
import { searchAuctionsClient } from "@/screens/auction/auction-list/api/search-auctions.client";

export const searchAuctionsQueryClient = (filters: AuctionFilters, size = 15) =>
  infiniteQueryOptions({
    queryKey: ["auctions", "search", { ...filters, size }] as const,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => searchAuctionsClient({ ...filters, page: pageParam, size }),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
