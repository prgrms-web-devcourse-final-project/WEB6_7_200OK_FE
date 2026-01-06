import { getAuctions, getAuctionsClient } from "@/screens/main/api/get-auctions";

export const auctionsQuery = {
  queryKey: ["auctions"],
  queryFn: getAuctions,
};

export const auctionsQueryClient = {
  queryKey: ["auctions"],
  queryFn: getAuctionsClient,
};
