"use client";

import { MessageSquareOff } from "lucide-react";

import type { BuyersType } from "@/features/auction/auction-sale/model/types";
import { EmptyState, Button } from "@/shared/ui";

export default function AuctionDetailSellerReviewList({ buyers }: { buyers: BuyersType[] }) {
  if (buyers.length === 0) {
    return (
      <EmptyState
        title="판매자 리뷰가 없어요"
        description="해당 판매자의 리뷰가 없습니다."
        Icon={MessageSquareOff}
      />
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div>
        {buyers.map((buyer) => (
          <div key={buyer.buyerId} className="flex gap-1">
            <span className="text-muted-foreground text-sm">{buyer.username}</span>
            <p className="text-foreground flex-1 overflow-hidden text-sm text-ellipsis whitespace-nowrap">
              {buyer.content}
            </p>
          </div>
        ))}
      </div>
      <Button className="flex-1" variant="outline" size="default">
        리뷰 보러가기
      </Button>
    </div>
  );
}
