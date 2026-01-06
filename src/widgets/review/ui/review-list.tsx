"use client";

import { MessageSquare } from "lucide-react";

import { ReviewCard } from "@/entities/review";
import { useReviews } from "@/features/review";
import { DashboardContentLayout, EmptyState } from "@/shared/ui";
import { ReviewItemListSkeleton } from "@/widgets/user/ui/skeletons";

export function ReviewList({ label, userId }: { label: React.ReactNode; userId: number }) {
  const { data: reviews = [], isPending, isFetched } = useReviews(userId);

  const renderContent = () => {
    if (isPending) {
      return <ReviewItemListSkeleton />;
    }

    if (isFetched && reviews.length > 0) {
      return reviews.map((review) => <ReviewCard key={review.id} review={review} />);
    }

    if (isFetched) {
      return (
        <EmptyState
          Icon={MessageSquare}
          title="작성된 리뷰가 없습니다."
          description="거래 완료 후 소중한 후기를 남겨주세요."
          className="py-20"
        />
      );
    }

    return null;
  };

  return <DashboardContentLayout label={label}>{renderContent()}</DashboardContentLayout>;
}
