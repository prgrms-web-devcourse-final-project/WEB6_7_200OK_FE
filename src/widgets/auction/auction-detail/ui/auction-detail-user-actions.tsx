"use client";

import type { AuctionStatusType } from "@/entities/auction";
import useAuctionSocket from "@/entities/auction/hooks/use-auction-socket";
import { AuctionNotificationToggle } from "@/entities/notification";
import { AuctionDetailLikeToggle } from "@/features/auction/auction-like";
import { PurchaseButton } from "@/features/auction/auction-purchase";
import AuctionSellerEmojiButton from "@/features/auction/auction-sale/ui/auction-seller-emoji-button";
import { useRecentView } from "@/features/auction/auction-view/hook/use-recent-view";
import { useMounted } from "@/shared/lib/hooks/use-mounted";

export default function AuctionDetailUserActions({
  auctionId,
  status,
  title,
  sellerId,
  isLike,
  likeCount,
  token,
}: {
  auctionId: string;
  status: AuctionStatusType;
  title: string;
  sellerId: number;
  isLike: boolean;
  likeCount: number;
  token?: string;
}) {
  const mounted = useMounted();
  useAuctionSocket(auctionId);
  useRecentView(auctionId);
  if (!mounted) return null;
  const userId = document.cookie
    .split("; ")
    .find((c) => c.startsWith("userId="))
    ?.split("=")[1];
  const isSeller = userId === String(sellerId);
  return (
    <div className="flex items-center gap-2">
      {isSeller ? (
        <AuctionSellerEmojiButton auctionId={auctionId} token={token} />
      ) : (
        <>
          <div className="flex items-center gap-1">
            <AuctionNotificationToggle auctionId={auctionId} />
            <AuctionDetailLikeToggle
              auctionId={auctionId}
              initLikeCount={likeCount}
              initIsLiked={isLike}
            />
          </div>
          <PurchaseButton status={status} auctionId={auctionId} title={title} />
        </>
      )}
    </div>
  );
}
