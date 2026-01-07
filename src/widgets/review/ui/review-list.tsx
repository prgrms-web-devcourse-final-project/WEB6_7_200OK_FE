"use client";

import { useEffect, useMemo } from "react";

import { MessageSquare } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { ReviewCard } from "@/entities/review";
import { useReviews } from "@/features/review";
import { DashboardContentLayout, EmptyState, Spinner } from "@/shared/ui";
import { ReviewItemListSkeleton } from "@/widgets/user/ui/skeletons";

export function ReviewList({ label, userId }: { label: React.ReactNode; userId: number }) {
  const { data, isPending, isFetched, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReviews(userId);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const reviews = useMemo(() => data?.pages.flatMap((page) => page.slice) ?? [], [data]);

  const renderContent = () => {
    if (isPending) {
      return <ReviewItemListSkeleton />;
    }

    if (isFetched && reviews.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          <div ref={ref} className="h-4 w-full">
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Spinner className="text-brand-primary size-6" />
              </div>
            )}
          </div>
        </div>
      );
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
