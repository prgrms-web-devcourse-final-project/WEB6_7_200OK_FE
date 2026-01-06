import { infiniteQueryOptions } from "@tanstack/react-query";

import { type AuctionFilters } from "@/features/auction/filters/model/types";
import {
  searchAuctions,
  searchAuctionsClient,
} from "@/screens/auction/auction-list/api/search-auctions";

export const searchAuctionsQuery = (filters: AuctionFilters, size = 15) =>
  infiniteQueryOptions({
    queryKey: ["auctions", "search", { ...filters, size }] as const,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => searchAuctions({ ...filters, page: pageParam, size }),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });

export const searchAuctionsQueryClient = (filters: AuctionFilters, size = 15) =>
  infiniteQueryOptions({
    queryKey: ["auctions", "search", { ...filters, size }] as const,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => searchAuctionsClient({ ...filters, page: pageParam, size }),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
