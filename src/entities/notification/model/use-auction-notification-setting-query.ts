"use client";

import { useQuery } from "@tanstack/react-query";

import { getAuctionNotificationSettings } from "@/entities/notification/api/notification-setting";

export const auctionNotificationSettingsKey = (auctionId: string | number) =>
  ["auctionNotificationSettings", auctionId] as const;

export function useAuctionNotificationSettingsQuery(auctionId: string | number) {
  return useQuery({
    queryKey: ["auctionNotificationSettings", auctionId] as const,
    queryFn: () => getAuctionNotificationSettings(auctionId),
    enabled: !!auctionId,
  });
}
