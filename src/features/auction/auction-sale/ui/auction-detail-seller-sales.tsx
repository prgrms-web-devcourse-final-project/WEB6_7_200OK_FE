import { Box } from "lucide-react";

import type { SellerAuctionType } from "@/features/auction/auction-sale/model/types";
import { EmptyState, ScrollArea, ScrollBar } from "@/shared/ui";

export default function AuctionDetailSellerSales({ auctions }: { auctions: SellerAuctionType[] }) {
  if (auctions.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">판매 상품</h3>
        <EmptyState
          Icon={Box}
          title="현재 판매중인 물품이 없어요."
          description="판매자가 판매중인 물품이 없습니다."
        />
      </div>
    );
  }
  return (
    <ScrollArea>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
