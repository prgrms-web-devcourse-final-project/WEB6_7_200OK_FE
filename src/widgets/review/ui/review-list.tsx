"use client";

import { useMemo } from "react";

import { MOCK_REVIEWS } from "@/entities/review/api/mocks";
import { ReviewCard } from "@/entities/review/ui/review-card";
import { DashboardContentLayout } from "@/shared/ui/layout/dashboard-content-layout";

interface ReviewListProps {
  labelNode?: React.ReactNode;
}

export function ReviewList({ labelNode }: ReviewListProps) {
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
    <DashboardContentLayout labelNode={labelNode}>
      {sortedReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </DashboardContentLayout>
  );
}
