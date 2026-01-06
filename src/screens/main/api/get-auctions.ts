import { AuctionsData } from "@/screens/main/model/types";
import { httpClient } from "@/shared/api/client";
import { fetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const getAuctions = async () => {
  const response = await fetch<AuctionsData>(API_ENDPOINTS.auctions);

  return response.data;
};

export const getAuctionsClient = async () => {
  const response = await httpClient<AuctionsData>(API_ENDPOINTS.auctions);

  return response.data;
};
