import { useId } from "react";

import { RatingButton, Rating } from "@/shared/ui";

export default function AuctionDetailSellerReviewHeader({
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
