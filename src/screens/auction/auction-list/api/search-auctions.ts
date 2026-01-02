import { AuctionListData, AuctionListParams } from "@/screens/auction/auction-list/model/types";
import { fetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const searchAuctions = async (params: AuctionListParams, page: number, size: number) => {
  const query = new URLSearchParams();

  if (params.query) query.set("query", params.query);
  if (params.category) query.set("category", params.category);
  if (params.status) query.set("status", params.status);
  if (params.minPrice !== undefined) query.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined) query.set("maxPrice", String(params.maxPrice));
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.sortDirection) query.set("sortDirection", params.sortDirection);

  query.set("page", String(page));
  query.set("size", String(size));

  const response = await fetch<AuctionListData>(
    `${API_ENDPOINTS.auctionSearch}?${query.toString()}`
  );

  return response.data;
};
