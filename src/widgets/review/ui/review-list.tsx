"use client";

import { ReviewCard } from "@/entities/review";
import { useReviewList } from "@/features/review/api/use-reviews";
import { DashboardContentLayout, Skeleton } from "@/shared/ui";

interface ReviewListProps {
  label?: React.ReactNode;
}

export function ReviewList({ label }: ReviewListProps) {
  const { data: reviews = [], isLoading } = useReviewList();

  if (isLoading) {
    return (
      <DashboardContentLayout label={label}>
        <div className="space-y-4">
          {[1, 2].map((id) => (
            <Skeleton key={id} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </DashboardContentLayout>
    );
  }

  return (
    <DashboardContentLayout label={label}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </DashboardContentLayout>
  );
}
