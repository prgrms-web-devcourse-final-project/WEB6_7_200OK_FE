import { AuctionListParams, AuctionListData } from "@/screens/auction/auction-list/model/types";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const searchAuctionsClient = async (params: AuctionListParams): Promise<AuctionListData> => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const response = await httpClient<AuctionListData>(
    `${API_ENDPOINTS.auctionSearch}?${query.toString()}`
  );

  return response.data;
};
