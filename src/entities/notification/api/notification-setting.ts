import type { NotificationSettingsType } from "@/entities/notification/model/types";
import { fetch } from "@/shared/api/server";

export async function getAuctionNotificationSettings(auctionId: string | number) {
  const res = await fetch<NotificationSettingsType>(
    `/api/v1/auctions/${auctionId}/notification-settings`,
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
  const res = await fetch(`api/v1/auctions/${auctionId}/notification-settings`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (res.code === 200) return;
  throw new Error("Failed  to update notification setting");
}
