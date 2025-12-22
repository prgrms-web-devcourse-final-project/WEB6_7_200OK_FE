import { ItemCategory } from "@/entities/auction/model/category";
import { AuctionListData } from "@/screens/auction/auction-list/model/types";
import { fetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface SearchParams {
  keyword?: string;
  category?: ItemCategory;
  page?: number;
  size?: number;
}

export const getAuctions = async (params: SearchParams = {}) => {
  try {
    const query = new URLSearchParams();

    if (params.keyword) query.set("keyword", params.keyword);
    if (params.category) query.set("category", params.category);
    query.set("page", String(params.page ?? 1));
    query.set("size", String(params.size ?? 15));

    const response = await fetch<AuctionListData>(
      `${API_ENDPOINTS.auctionSearch}?${query.toString()}`
    );

    // TODO: 에러 핸들링
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`경매 정보를 불러오는 도중 에러가 발생했습니다: ${message}`);
  }
};
