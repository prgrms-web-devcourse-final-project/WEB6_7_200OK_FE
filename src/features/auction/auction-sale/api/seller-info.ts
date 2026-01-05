import type { AuctionSellerInfoType } from "@/features/auction/auction-sale/model/types";
import { fetch } from "@/shared/api/server";

export const sellerInfoQuery = (sellerId: number) => ({
  queryKey: ["sellerInfo", sellerId] as const,
  queryFn: async () => {
    const { data } = await fetch<AuctionSellerInfoType>(`/api/v1/auctions/${sellerId}/seller`);
    if (!data) throw new Error("Failed to fetch sellerInfo");
    return data;
  },
  staleTime: 60_000,
});
