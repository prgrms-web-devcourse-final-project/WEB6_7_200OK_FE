"use client";

import useAuctionSocket from "@/entities/auction/hooks/use-auction-socket";
import { AuctionNotificationToggle } from "@/entities/notification";
import { AuctionDetailLikeToggle } from "@/features/auction/auction-like";

export default function AuctionDetailUserActions({
  children,
  auctionId,
}: {
  children: React.ReactNode;
  auctionId: string;
}) {
  useAuctionSocket(auctionId);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <AuctionNotificationToggle />
        <AuctionDetailLikeToggle />
      </div>
      {children}
    </div>
  );
}
