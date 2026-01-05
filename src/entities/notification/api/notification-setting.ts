import type { NotificationSettingsType } from "@/entities/notification/model/types";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export async function getAuctionNotificationSettings(auctionId: string | number) {
  const res = await httpClient<NotificationSettingsType>(
    API_ENDPOINTS.auctionNotificationSetting(auctionId),
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res.code === 200) {
    return res.data;
  }
  throw new Error("Failed to fetch notification settings");
}

export async function updateAuctionNotificationSettings(
  auctionId: string | number,
  body: NotificationSettingsType
) {
  const res = await httpClient(API_ENDPOINTS.auctionNotificationSetting(auctionId), {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (res.code === 200) return;
  throw new Error("Failed to update notification setting");
}
