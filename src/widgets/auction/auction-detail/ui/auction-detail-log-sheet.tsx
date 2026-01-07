"use client";

import { useState } from "react";

import { type ItemCategory } from "@/entities/auction";
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";
import AuctionDetailLogSheetContent from "@/widgets/auction/auction-detail/ui/auction-detail-log-sheet-content";

interface AuctionDetailLogSheetProps {
  title: string;
  category: ItemCategory;
  thumbnail: string;
  startPrice: number;
  dropAmount: number;
  auctionId: number | string;
}

export default function AuctionDetailLogSheet({
  title,
  category,
  thumbnail,
  startPrice,
  dropAmount,
  auctionId,
}: AuctionDetailLogSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">하락 내역 더보기</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>하락 내역</SheetTitle>
        </SheetHeader>
        <AuctionDetailLogSheetContent
          auctionId={auctionId}
          startPrice={startPrice}
          dropAmount={dropAmount}
          title={title}
          category={category}
          thumbnail={thumbnail}
        />
      </SheetContent>
    </Sheet>
  );
}
