import { getAuctionsClient } from "@/screens/main/api/get-auctions.client";

export const auctionsQueryClient = {
  queryKey: ["auctions"],
  queryFn: getAuctionsClient,
};
