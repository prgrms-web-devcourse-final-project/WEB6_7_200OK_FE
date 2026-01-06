import { AuctionProgress } from "@/entities/auction";
import { AuctionTickerProvider } from "@/entities/auction/hooks/use-auction-ticker";
import { EmojiStoreProvider } from "@/features/auction/auction-emoji/provider/use-emoji-store-provider";
import EmojiLayer from "@/features/auction/auction-emoji/ui/emoji-layer";
import { AuctionLogList } from "@/features/auction/auction-log";
import { AuctionViewerProvider } from "@/features/auction/auction-log/provider/use-auction-viewer";
import AuctionDetailSellerInfo from "@/features/auction/auction-sale/ui/auction-detail-seller-info";
import type { AuctionDetailType } from "@/screens/auction/auction-detail/model/types";
import AuctionDetailErrorScreen from "@/screens/auction/auction-detail/ui/auction-detail-error-screen";
import {
  calculateAuctionStartMs,
  calculateElapsedMsWithin5MinCycle,
  calculateElapsedMsWithinCreatedToStarted,
} from "@/shared/lib/utils/time/calc";
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
} from "@/widgets/auction/auction-detail";
import { AuctionPriceStoreProvider } from "@/widgets/auction/auction-detail/provider/auction-price-store-provider";

export default function AuctionDetailScreen({
  data,
  id,
  token,
}: {
  data: AuctionDetailType;
  id: string;
  token?: string;
}) {
  if (!data || !id) {
    return (
      <AuctionDetailErrorScreen
        title="경매를 찾을 수 없습니다"
        description="요청하신 경매에 대한 정보를 찾을 수 없어요"
      />
    );
  }
  return (
    <ScrollArea className="h-[calc(100vh-var(--header-h))] lg:h-[calc(100vh-var(--header-h))]">
      <AuctionViewerProvider initCount={data.viewerCount}>
        <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col-reverse lg:flex-row">
          {/* Left Section */}
          <div className="lg:min-w-125 lg:shrink lg:grow-0 lg:basis-189">
            <div className="flex flex-col gap-8 p-4">
              <ImageCarousel className="hidden lg:block" status={data.status} />
              <Separator />
              <AuctionDetailDescription description={data.description} />
              <Separator />
              <AuctionDetailSellerInfo seller={data.seller} />
            </div>
          </div>

          {/* Divider */}
          <Separator orientation="vertical" />

          {/* Right Section */}
          <div className="overflow-y-auto lg:sticky lg:top-0 lg:max-h-[calc(100vh-var(--header-h))] lg:min-w-131 lg:shrink-0 lg:grow-0 lg:basis-131">
            <div className="flex flex-col gap-8 p-4">
              <ImageCarousel className="block lg:hidden" status={data.status} />
              <AuctionDetailCategory category={data.category} />
              <AuctionPriceStoreProvider price={data.currentPrice} stopLoss={data.stopLoss}>
                <AuctionTickerProvider
                  dropAmount={data.dropAmount}
                  duration={
                    data.status === "SCHEDULED"
                      ? calculateAuctionStartMs(data.createdDate, data.startedAt)
                      : 5 * 60 * 1000
                  }
                  initDiff={
                    data.status === "SCHEDULED"
                      ? calculateElapsedMsWithinCreatedToStarted(
                          data.createdDate,
                          data.serverTime,
                          data.startedAt
                        )
                      : calculateElapsedMsWithin5MinCycle(data.serverTime)
                  }
                >
                  <AuctionDetailPrice startPrice={data.startPrice} />
                  <AuctionDetailTitle title={data.title} />
                  <AuctionDetailTags tags={data.tags} />
                  <AuctionDetailSeller seller={data.seller} />
                  <AuctionProgress status={data.status} />
                </AuctionTickerProvider>
                <EmojiStoreProvider>
                  <AuctionDetailUserActions
                    auctionId={id}
                    status={data.status}
                    title={data.title}
                    isLike={data.isLiked}
                    likeCount={data.likeCount}
                    sellerId={data.seller.sellerId}
                    token={token}
                  />
                  <EmojiLayer />
                </EmojiStoreProvider>
              </AuctionPriceStoreProvider>
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
      </AuctionViewerProvider>
      <ScrollBar asChild />
    </ScrollArea>
  );
}
