import type { AuctionSellerInfoType } from "@/features/auction/auction-sale/model/types";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const sellerInfoQuery = (sellerId: number) => ({
  queryKey: ["sellerInfo", sellerId] as const,
  queryFn: async () => {
    const { data } = await httpClient<AuctionSellerInfoType>(
      API_ENDPOINTS.auctionSellerInfo(sellerId)
    );
    if (!data) throw new Error("Failed to fetch sellerInfo");
    return data;
  },
  staleTime: 60_000,
});
