import { useId } from "react";

import { Box, MessageSquareOff } from "lucide-react";

import EmptyState from "@/shared/ui/empty/empty";
import { Rating, RatingButton } from "@/shared/ui/rating/rating";

export default function ProductReview() {
  return (
    <div className="flex flex-col gap-4">
      <ProductReviewRating />
      <ProductReviewList />
      <ProductReviewRecommends />
    </div>
  );
}

function ProductReviewRating() {
  const id = useId();
  const value = 3;
  const reviewsLength = 127;
  return (
    <div className="flex items-center gap-4">
      <h3 className="text-foreground font-lg font-semibold">판매자 후기</h3>
      <div className="flex items-center gap-1">
        <Rating defaultValue={value} readOnly>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((v) => (
            <RatingButton className="text-brand" key={id + v} size={20} />
          ))}
        </Rating>
        <span className="text-foreground text-base">{value}</span>
        <span className="text-muted-foreground text-sm">{`(${reviewsLength}개의 후기)`}</span>
      </div>
    </div>
  );
}

function ProductReviewList() {
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

function ProductReviewRecommends() {
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
