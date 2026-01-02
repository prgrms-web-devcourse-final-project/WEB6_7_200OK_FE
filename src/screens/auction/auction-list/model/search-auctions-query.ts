import { InfiniteData, infiniteQueryOptions } from "@tanstack/react-query";

import { searchAuctions } from "@/screens/auction/auction-list/api/search-auctions";
import type {
  AuctionListData,
  AuctionListParams,
} from "@/screens/auction/auction-list/model/types";

export const searchAuctionsQuery = (params: AuctionListParams) =>
  infiniteQueryOptions<
    AuctionListData,
    Error,
    InfiniteData<AuctionListData>,
    ["auctions", "search", AuctionListParams],
    number
  >({
    queryKey: ["auctions", "search", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => searchAuctions(params, pageParam, params.size ?? 15),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
