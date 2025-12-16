"use client";

import { useMemo } from "react";

import { MOCK_REVIEWS } from "@/entities/review/api/mocks";
import { ReviewCard } from "@/entities/review/ui/review-card";

export function ReviewList() {
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
    <div className="flex flex-col gap-4">
      {sortedReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
