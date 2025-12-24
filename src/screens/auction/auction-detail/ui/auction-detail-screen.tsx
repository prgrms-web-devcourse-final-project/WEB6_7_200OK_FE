import { AuctionProgress } from "@/entities/auction";
import { AuctionTickerProvider } from "@/entities/auction/hooks/use-auction-ticker";
import { AuctionLogList } from "@/features/auction/auction-log";
import { AuctionDetailReview } from "@/features/auction/auction-review";
import type { AuctionDetailType } from "@/screens/auction/auction-detail/model/types";
import { Separator, ScrollArea, ScrollBar } from "@/shared/ui";
import {
  AuctionDetailCategory,
  AuctionDetailPrice,
  AuctionDetailTitle,
  AuctionDetailTags,
  AuctionDetailSeller,
  AuctionDetailDescription,
  AuctionDetailLogSheet,
  AuctionDetailUserActions,
  // ImageCarousel,
} from "@/widgets/auction/auction-detail";

export default function AuctionDetailScreen({ data }: { data: AuctionDetailType }) {
  if (!data) {
    return (
      <div className="p-4">
        <p>데이터가 없습니다.</p>
      </div>
    );
  }
  return (
    <ScrollArea className="h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row">
        {/* Left Section */}
        <div className="lg:min-w-125 lg:shrink lg:grow-0 lg:basis-189">
          <div className="flex flex-col gap-8 p-4">
            <Separator />
            <AuctionDetailDescription description={data.description} />
            <Separator />
            <AuctionDetailReview seller={data.seller} />
          </div>
        </div>

        {/* Divider */}
        <Separator orientation="vertical" />

        {/* Right Section */}
        <div className="overflow-y-auto lg:sticky lg:top-0 lg:max-h-[calc(100vh-120px)] lg:min-w-131 lg:shrink-0 lg:grow-0 lg:basis-131">
          <div className="flex flex-col gap-8 p-4">
            <AuctionDetailCategory category={data.category} />
            <AuctionTickerProvider>
              <AuctionDetailPrice startPrice={data.startPrice} currentPrice={data.currentPrice} />
              <AuctionDetailTitle title={data.title} />
              <AuctionDetailTags tags={data.tags} />
              <AuctionDetailSeller seller={data.seller} />
              <AuctionProgress />
            </AuctionTickerProvider>
            <AuctionDetailUserActions />
            <div className="flex flex-col gap-3">
              <AuctionLogList
                recentPriceHistory={data.recentPriceHistory}
                discountRate={data.discountRate}
                startPrice={data.startPrice}
              />
              <AuctionDetailLogSheet
                recentPriceHistory={data.recentPriceHistory}
                discountRate={data.discountRate}
                startPrice={data.startPrice}
              />
            </div>
          </div>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
