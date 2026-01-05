"use client";

import type { AuctionStatusType } from "@/entities/auction";
import useAuctionSocket from "@/entities/auction/hooks/use-auction-socket";
import { AuctionNotificationToggle } from "@/entities/notification";
import { AuctionDetailLikeToggle } from "@/features/auction/auction-like";
import { PurchaseButton } from "@/features/auction/auction-purchase";
import { useMounted } from "@/shared/lib/hooks/use-mounted";

export default function AuctionDetailUserActions({
  auctionId,
  status,
  title,
  sellerId,
  isLike,
  likeCount,
}: {
  auctionId: string;
  status: AuctionStatusType;
  title: string;
  sellerId: number;
  isLike: boolean;
  likeCount: number;
}) {
  const mounted = useMounted();
  useAuctionSocket(auctionId);
  if (!mounted) return null;
  const userId = document.cookie
    .split("; ")
    .find((c) => c.startsWith("userId="))
    ?.split("=")[1];
  const isSeller = userId === String(sellerId);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <AuctionNotificationToggle userId={userId} />
        <AuctionDetailLikeToggle userId={userId} likeCount={likeCount} isLike={isLike} />
      </div>
      {isSeller ? (
        <button type="button">감정 보내기</button>
      ) : (
        <PurchaseButton status={status} auctionId={auctionId} title={title} />
      )}
    </div>
  );
}
