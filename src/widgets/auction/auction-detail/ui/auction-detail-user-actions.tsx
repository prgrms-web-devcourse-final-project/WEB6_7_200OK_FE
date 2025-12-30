import { AuctionNotificationToggle } from "@/entities/notification";
import { AuctionDetailLikeToggle } from "@/features/auction/auction-like";

export default function AuctionDetailUserActions({ children }: { children: React.ReactNode }) {
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
