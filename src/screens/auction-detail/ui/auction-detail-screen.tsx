import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area/scroll-area";
import Separator from "@/shared/ui/separator/separator";
import ProductCategory from "@/widgets/auction-detail/ui/product-category";
import ProductName from "@/widgets/auction-detail/ui/product-name";
import ProductPrice from "@/widgets/auction-detail/ui/product-price";
import ProductSeller from "@/widgets/auction-detail/ui/product-seller";
import ProductTags from "@/widgets/auction-detail/ui/product-tags";

export default function AuctionDetailScreen() {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row">
        {/* Left Section */}
        <div className="lg:min-w-125 lg:shrink lg:grow-0 lg:basis-189" />

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
          </div>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
