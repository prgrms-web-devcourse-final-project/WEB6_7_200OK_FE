import { useQuery } from "@tanstack/react-query";

import { MOCK_REVIEWS, ReviewType } from "@/entities/review";

// TODO: 실제 API 엔드포인트가 나오면 교체
const getMyReviews = async (): Promise<ReviewType[]> =>
  new Promise((resolve) => {
    // TODO: 실제 API 엔드포인트 연결하면 제거(서버에서 정렬해서 줌)
    const sortedReviews = [...MOCK_REVIEWS].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    setTimeout(() => resolve(sortedReviews), 500);
  });

export const reviewKeys = {
  all: ["user", "reviews"] as const,
};

export function useReviewList() {
  return useQuery({
    queryKey: reviewKeys.all,
    queryFn: getMyReviews,
  });
}
