import { getAuctions } from "@/screens/main/api/get-auctions";

export const auctionsQuery = {
  queryKey: ["auctions"],
  queryFn: getAuctions,
};
