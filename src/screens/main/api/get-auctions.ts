import { AuctionsData } from "@/screens/main/model/types";
import { fetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const getAuctions = async () => {
  const response = await fetch<AuctionsData>(API_ENDPOINTS.auctions);

  return response.data;
};
