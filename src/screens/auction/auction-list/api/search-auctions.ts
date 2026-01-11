import { AuctionListParams, AuctionListData } from "@/screens/auction/auction-list/model/types";
import { fetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const searchAuctions = async (params: AuctionListParams): Promise<AuctionListData> => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value
        .filter((item) => item !== undefined && item !== null && item !== "")
        .forEach((item) => query.append(key, String(item)));
      return;
    }

    query.set(key, String(value));
  });

  const response = await fetch<AuctionListData>(
    `${API_ENDPOINTS.auctionSearch}?${query.toString()}`
  );

  return response.data;
};
