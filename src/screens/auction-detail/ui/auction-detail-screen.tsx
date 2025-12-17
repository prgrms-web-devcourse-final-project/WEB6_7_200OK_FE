import { AuctionProgress } from "@/entities/auction";
import ProductLogList from "@/features/auction-log/ui/product-log-list";
import { ProductReview } from "@/features/review";
import { AUCTION_DETAIL_MOCKDATA } from "@/screens/auction-detail/model/data";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area/scroll-area";
import Separator from "@/shared/ui/separator/separator";
import {
  ProductCategory,
  ProductPrice,
  ProductName,
  ProductTags,
  ProductSeller,
  ProductInfo,
  ProductLogSheet,
  ProductUserActions,
  ImageCarousel,
} from "@/widgets/auction-detail";

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
            <ProductInfo text="제품 설명" />
            <Separator />
            <ProductReview />
          </div>
        </div>

        {/* Divider */}
        <Separator orientation="vertical" />

        {/* Right Section */}
        <div className="overflow-y-auto lg:sticky lg:top-0 lg:max-h-[calc(100vh-120px)] lg:min-w-131 lg:shrink-0 lg:grow-0 lg:basis-131">
          <div className="flex flex-col gap-8 p-4">
            <ProductCategory />
            <ProductPrice />
            <ProductName />
            <ProductTags />
            <ProductSeller />
            <AuctionProgress />
            <ProductUserActions />
            <div className="flex flex-col gap-3">
              <ProductLogList />
              <ProductLogSheet />
            </div>
          </div>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
