import { AuctionNotificationToggle } from "@/entities/notification";
import { AuctionDetailLikeToggle } from "@/features/auction/auction-like";
import { PurchaseButton } from "@/features/auction/auction-purchase";

export default function AuctionDetailUserActions() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <AuctionNotificationToggle />
        <AuctionDetailLikeToggle />
      </div>
      <PurchaseButton />
    </div>
  );
}
