"use client";

import { useId } from "react";

import { Box, MessageSquareOff } from "lucide-react";

import type { SellerType } from "@/features/auction/auction-sale";
import { useSellerInfo } from "@/features/auction/auction-sale/hook/use-seller-info";
import { Rating, RatingButton, EmptyState } from "@/shared/ui";

interface AuctionDetailReviewProps {
  seller: SellerType;
}

export default function AuctionDetailReview({ seller }: AuctionDetailReviewProps) {
  const { data, isLoading, error } = useSellerInfo(seller.sellerId);
  console.log(data);
  if (error) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>isLoading</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <AuctionDetailReviewRating reviewCount={seller.reviewCount} rating={seller.rating} />
      <AuctionDetailReviewList />
      <AuctionDetailSellerSales />
    </div>
  );
}

function AuctionDetailReviewRating({
  rating,
  reviewCount,
}: Readonly<{ rating: number; reviewCount: number }>) {
  const id = useId();
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <h3 className="text-foreground font-lg font-semibold">판매자 후기</h3>
      <div className="flex items-center gap-1">
        <Rating defaultValue={rating} readOnly>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((v) => (
            <RatingButton className="text-brand" key={id + v} size={20} />
          ))}
        </Rating>
        <span className="text-foreground text-base">{rating}</span>
        <span className="text-muted-foreground text-sm">{`(${reviewCount}개의 후기)`}</span>
      </div>
    </div>
  );
}

function AuctionDetailReviewList() {
  const reviews = [
    {
      id: 1,
      user: "구매자1",
      text: "상품 상태가 매우 좋았고 빠른 배송 감사합니다.상품 상태가 매우 좋았고 빠른 배송 감사합니다 상품 상태가 매우 좋았고 빠른 배송 감사합니다",
    },
  ];
  if (reviews.length === 0) {
    return (
      <EmptyState
        title="판매자 리뷰가 없어요"
        description="해당 판매자의 리뷰가 없습니다."
        Icon={MessageSquareOff}
      />
    );
  }
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-1">
          <span className="text-muted-foreground text-sm">구매자1</span>
          <p className="text-foreground flex-1 overflow-hidden text-sm text-ellipsis whitespace-nowrap">
            상품 상태가 매우 좋았고 빠른 배송 감사합니다.
          </p>
        </div>
      ))}
    </div>
  );
}

function AuctionDetailSellerSales() {
  const hasItem = false;
  if (!hasItem)
    return (
      <div className="flex flex-col gap-2">
        <h3 className="font-base font-semibold">판매 상품</h3>
        <EmptyState
          Icon={Box}
          title="현재 판매중인 물품이 없어요."
          description="판매자가 판매중인 물품이 없습니다."
        />
      </div>
    );
  return (
    <div>
      <h3 className="font-base font-semibold">판매 상품</h3>
    </div>
  );
}
