import type { ReactNode } from "react";

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui";

interface AuctionFiltersSheetProps {
  trigger?: ReactNode;
}

export function AuctionFiltersSheet({ trigger }: AuctionFiltersSheetProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>

        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle className="text-base">필터</SheetTitle>
            <SheetDescription className="sr-only">
              원하는 필터를 선택한 뒤 적용 버튼을 눌러 결과를 확인하세요
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 pb-6">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                초기화
              </Button>
              <Button className="flex-1">적용</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
