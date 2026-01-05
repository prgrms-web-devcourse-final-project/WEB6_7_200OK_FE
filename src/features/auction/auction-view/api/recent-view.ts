import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export async function recordRecentView(auctionId: string | number) {
  await httpClient(API_ENDPOINTS.auctionRecentView(auctionId), {
    method: "POST",
    credentials: "include",
  });
}
