import { useQuery } from "@tanstack/react-query";

import { MOCK_REVIEWS, ReviewType } from "@/entities/review";

const fetchMyReviews = async (): Promise<ReviewType[]> =>
  new Promise((resolve) => {
    // API 연동 시 정렬된 데이터를 받아오거나, 여기서 sort 가능
    const sortedReviews = [...MOCK_REVIEWS].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    setTimeout(() => resolve(sortedReviews), 500); // 서버 지연 테스트 0.5초
  });

export const reviewKeys = {
  all: ["user", "reviews"] as const,
};

export function useReviewList() {
  return useQuery({
    queryKey: reviewKeys.all,
    queryFn: fetchMyReviews,
  });
}
