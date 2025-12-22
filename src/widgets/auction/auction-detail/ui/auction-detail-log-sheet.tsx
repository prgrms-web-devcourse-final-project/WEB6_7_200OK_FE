import {
  AuctionDetailThumbnail,
  AuctionLogChart,
  AuctionLogList,
} from "@/features/auction/auction-log";
import type { RecentPriceHistoryType } from "@/features/auction/auction-log";
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";

interface AuctionDetailLogSheetProps {
  recentPriceHistory: RecentPriceHistoryType[];
  startPrice: number;
  discountRate: number;
}

export default function AuctionDetailLogSheet({
  recentPriceHistory,
  startPrice,
  discountRate,
}: AuctionDetailLogSheetProps) {
  if (recentPriceHistory.length === 0) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">하락 내역 더보기</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>하락 내역</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 px-4">
          <AuctionDetailThumbnail />
          <AuctionLogChart />
          <AuctionLogList
            isSheet
            recentPriceHistory={recentPriceHistory}
            startPrice={startPrice}
            discountRate={discountRate}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
