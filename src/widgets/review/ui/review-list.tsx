"use client";

import { useMemo } from "react";

import { MOCK_REVIEWS, ReviewCard } from "@/entities/review";
import { DashboardContentLayout } from "@/shared/ui";

interface ReviewListProps {
  label?: React.ReactNode;
}

export function ReviewList({ label }: ReviewListProps) {
  // TODO: 나중에 db에서 정렬된 순으로 받아오면 제거
  const sortedReviews = useMemo(
    () =>
      [...MOCK_REVIEWS].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        if (dateA !== dateB) {
          return dateB - dateA;
        }

        return a.reviewer.name.localeCompare(b.reviewer.name);
      }),
    []
  );

  return (
    <DashboardContentLayout label={label}>
      {sortedReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </DashboardContentLayout>
  );
}
