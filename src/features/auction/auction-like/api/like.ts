import type { LikeType } from "@/features/auction/auction-like/model/types";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export async function toggleAuctionLike(auctionId: string | number): Promise<LikeType> {
  return httpClient<LikeType>(API_ENDPOINTS.auctionLike(auctionId), {
    method: "POST",
  }).then((r) => r.data);
}
