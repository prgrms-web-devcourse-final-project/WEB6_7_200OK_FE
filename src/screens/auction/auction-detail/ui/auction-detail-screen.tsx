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
  ImageCarousel,
  // ImageCarousel,
} from "@/widgets/auction/auction-detail";
import { AuctionPriceStoreProvider } from "@/widgets/auction/auction-detail/provider/auction-price-store-provider";
import PurchaseWidget from "@/widgets/auction/auction-purchase/ui/PurchaseWidget";

export default function AuctionDetailScreen({ data, id }: { data: AuctionDetailType; id: string }) {
  if (!data || !id) {
    return (
      <div className="p-4">
        <p>데이터가 없습니다.</p>
      </div>
    );
  }
  const customerKey = globalThis.crypto.randomUUID();
  return (
    <ScrollArea className="h-[calc(100vh-var(--header-h))] lg:h-[calc(100vh-var(--header-h))]">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row">
        {/* Left Section */}
        <div className="lg:min-w-125 lg:shrink lg:grow-0 lg:basis-189">
          <div className="flex flex-col gap-8 p-4">
            <ImageCarousel className="hidden lg:block" />
            <Separator />
            <AuctionDetailDescription description={data.description} />
            <Separator />
            <AuctionDetailReview seller={data.seller} />
          </div>
        </div>

        {/* Divider */}
        <Separator orientation="vertical" />

        {/* Right Section */}
        <div className="overflow-y-auto lg:sticky lg:top-0 lg:max-h-[calc(100vh-var(--header-h))] lg:min-w-131 lg:shrink-0 lg:grow-0 lg:basis-131">
          <div className="flex flex-col gap-8 p-4">
            <ImageCarousel className="block lg:hidden" />
            <AuctionDetailCategory category={data.category} />
            <AuctionPriceStoreProvider price={data.currentPrice} stopLoss={data.stopLoss}>
              <AuctionTickerProvider rate={data.discountRate}>
                <AuctionDetailPrice startPrice={data.startPrice} />
                <AuctionDetailTitle title={data.title} />
                <AuctionDetailTags tags={data.tags} />
                <AuctionDetailSeller seller={data.seller} />
                <AuctionProgress />
              </AuctionTickerProvider>
            </AuctionPriceStoreProvider>
            <AuctionDetailUserActions auctionId={id}>
              <PurchaseWidget customerKey={customerKey} />
            </AuctionDetailUserActions>
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
      <ScrollBar asChild />
    </ScrollArea>
  );
}
