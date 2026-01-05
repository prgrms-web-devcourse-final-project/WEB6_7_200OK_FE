import type { ToggleLikeType } from "@/features/auction/auction-like/model/types";
import { httpClient } from "@/shared/api/client";

export async function toggleAuctionLike(auctionId: string | number): Promise<ToggleLikeType> {
  return httpClient<ToggleLikeType>(`/api/v1/auctions/${auctionId}/like`, {
    method: "POST",
  }).then((r) => r.data);
}
