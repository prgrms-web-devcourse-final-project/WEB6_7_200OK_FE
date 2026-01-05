import type { LikeType } from "@/features/auction/auction-like/model/types";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export async function toggleAuctionLike(auctionId: string | number): Promise<LikeType> {
  const response = await httpClient<LikeType>(API_ENDPOINTS.auctionLike(auctionId), {
    method: "POST",
  });
  if (response.code === 200) return response.data;
  throw new Error("like is error");
}
