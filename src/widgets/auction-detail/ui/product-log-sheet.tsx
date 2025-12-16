import ProductLogChart from "@/features/auction-log/ui/product-log-chart";
import ProductLogList from "@/features/auction-log/ui/product-log-list";
import ProductThumbnail from "@/features/auction-log/ui/product-thumbnail";
import Button from "@/shared/ui/button/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet/sheet";

export default function ProductLogSheet() {
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
          <ProductThumbnail />
          <ProductLogChart />
          <ProductLogList isSheet />
        </div>
      </SheetContent>
    </Sheet>
  );
}
