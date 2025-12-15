import { Rating, RatingButton } from "@/shared/ui/rating/rating";

export default function ProductReview() {
  return (
    <div className="flex flex-col gap-4">
      <ProductReviewRating />
      <ProductReviewScroll />
    </div>
  );
}

function ProductReviewRating() {
  const value = 3;
  const reviewsLength = 127;
  return (
    <div className="flex items-center gap-4">
      <span className="text-foreground font-lg font-semibold">판매자 후기</span>
      <div className="flex items-center gap-1">
        <Rating defaultValue={value} readOnly>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((_) => (
            <RatingButton className="text-brand" key={_} size={20} />
          ))}
        </Rating>
        <span className="text-foreground text-base">3</span>
        <span className="text-muted-foreground text-sm">{`(${reviewsLength}개의 후기)`}</span>
      </div>
    </div>
  );
}

function ProductReviewScroll() {
  const reviews = [
    {
      id: 1,
      user: "구매자1",
      text: "상품 상태가 매우 좋았고 빠른 배송 감사합니다.상품 상태가 매우 좋았고 빠른 배송 감사합니다 상품 상태가 매우 좋았고 빠른 배송 감사합니다",
    },
  ];
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-1">
          <span className="text-muted-foreground text-sm">구매자1</span>
          <span className="text-foreground flex-1 overflow-hidden text-sm text-ellipsis whitespace-nowrap">
            상품 상태가 매우 좋았고 빠른 배송 감사합니다.
          </span>
        </div>
      ))}
    </div>
  );
}
