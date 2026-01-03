"use client";

import type { AuctionStatusType } from "@/entities/auction";
import useAuctionSocket from "@/entities/auction/hooks/use-auction-socket";
import { AuctionNotificationToggle } from "@/entities/notification";
import { AuctionDetailLikeToggle } from "@/features/auction/auction-like";
import { PurchaseButton } from "@/features/auction/auction-purchase";

export default function AuctionDetailUserActions({
  auctionId,
  status,
  title,
}: {
  auctionId: string;
  status: AuctionStatusType;
  title: string;
}) {
  useAuctionSocket(auctionId);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <AuctionNotificationToggle />
        <AuctionDetailLikeToggle />
      </div>
      <PurchaseButton status={status} auctionId={auctionId} title={title} userName="김토스" />
    </div>
  );
}
