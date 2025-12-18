import { AuctionProgress } from "@/entities/auction";
import { AuctionLogList } from "@/features/auction/auction-log";
import { AuctionDetailReview } from "@/features/auction/auction-review";
import { AUCTION_DETAIL_MOCKDATA } from "@/screens/auction/auction-detail/model/data";
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

export default function AuctionDetailScreen() {
  const data = AUCTION_DETAIL_MOCKDATA;
  return (
    <ScrollArea className="h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row">
        {/* Left Section */}
        <div className="lg:min-w-125 lg:shrink lg:grow-0 lg:basis-189">
          <div className="flex flex-col gap-8 p-4">
            <ImageCarousel images={data.imageUrls} />
            <Separator />
            <AuctionDetailDescription text="제품 설명" />
            <Separator />
            <AuctionDetailReview />
          </div>
        </div>

        {/* Divider */}
        <Separator orientation="vertical" />

        {/* Right Section */}
        <div className="overflow-y-auto lg:sticky lg:top-0 lg:max-h-[calc(100vh-120px)] lg:min-w-131 lg:shrink-0 lg:grow-0 lg:basis-131">
          <div className="flex flex-col gap-8 p-4">
            <AuctionDetailCategory />
            <AuctionDetailPrice />
            <AuctionDetailTitle />
            <AuctionDetailTags />
            <AuctionDetailSeller />
            <AuctionProgress />
            <AuctionDetailUserActions />
            <div className="flex flex-col gap-3">
              <AuctionLogList />
              <AuctionDetailLogSheet />
            </div>
          </div>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
