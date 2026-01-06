import { AuctionsData } from "@/screens/main/model/types";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const getAuctionsClient = async () => {
  const response = await httpClient<AuctionsData>(API_ENDPOINTS.auctions);

  return response.data;
};
