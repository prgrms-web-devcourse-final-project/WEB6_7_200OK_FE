import { HomeAuctionsData } from "@/screens/home/model/types";
import { fetch } from "@/shared/api/server";

export const getHomeAuctions = async () => {
  try {
    const response = await fetch<HomeAuctionsData>("/api/v1/auctions");

    // TODO: ERROR 핸들링
    return response.data;
  } catch (error) {
    throw new Error(`경매 정보를 불러오는 도중 에러가 발생했습니다: ${error}`);
  }
};
