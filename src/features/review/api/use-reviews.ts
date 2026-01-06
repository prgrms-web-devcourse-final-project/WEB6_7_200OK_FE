import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import type { ReviewType } from "@/entities/review";
import { purchaseKeys } from "@/features/purchase/api/use-purchases";
import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface ReviewResponseItem {
  reviewId: number;
  auctionId: number;
  buyerId: number;
  nickname: string;
  userImageUrl: string;
  rating: number;
  content: string;
  auctionImageUrl: string;
  auctionTitle: string;
  reviewedAt?: string;
}

interface ReviewData {
  slice: ReviewResponseItem[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}

interface CreateReviewRequest {
  tradeId: number;
  rating: number;
  content: string;
}
interface UpdateReviewRequest {
  rating: number;
  content: string;
}

interface ReviewDetailResponse {
  reviewId: number;
  auctionId: number;
  sellerId: number;
  auctionTitle: string;
  nickname: string;
  rating: number;
  content: string;
}

export const reviewKeys = {
  all: ["user", "reviews"] as const,
  list: (userId: number) => [...reviewKeys.all, "list", userId] as const,
  detail: (reviewId: number) => [...reviewKeys.all, "detail", reviewId] as const,
};

const fetchUserReviews = async (userId: number): Promise<ReviewType[]> => {
  const response = await httpClient<ReviewData>(API_ENDPOINTS.userReviews(userId), {
    method: "GET",
  });
  const slice = response.data?.slice ?? [];

  return slice.map((item) => ({
    id: item.reviewId,
    rating: item.rating,
    content: item.content,
    date: item.reviewedAt ? dayjs(item.reviewedAt).format("YYYY-MM-DD") : "",
    reviewer: { id: item.buyerId, name: item.nickname, avatarUrl: item.userImageUrl },
    product: { id: item.auctionId, name: item.auctionTitle, imageUrl: item.auctionImageUrl },
  }));
};

const fetchReviewDetail = async (reviewId: number): Promise<ReviewType> => {
  const response = await httpClient<ReviewDetailResponse>(API_ENDPOINTS.reviewDetail(reviewId), {
    method: "GET",
  });
  const { data } = response;

  if (!data) throw new Error("Review not found");

  return {
    id: data.reviewId,
    rating: data.rating,
    content: data.content,
    date: "",
    reviewer: { name: "나" },
    product: { name: data.auctionTitle },
    seller: { name: data.nickname },
  };
};

export function useReviews(userId: number) {
  return useQuery({
    queryKey: reviewKeys.list(userId),
    queryFn: () => fetchUserReviews(userId),
    enabled: !!userId,
  });
}

export function useReviewDetail(reviewId: number | null) {
  return useQuery({
    queryKey: reviewKeys.detail(reviewId!),
    queryFn: () => fetchReviewDetail(reviewId!),
    enabled: !!reviewId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewRequest) =>
      httpClient(API_ENDPOINTS.reviews, { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: number; data: UpdateReviewRequest }) =>
      httpClient(API_ENDPOINTS.reviewDetail(reviewId), { method: "PATCH", body: data }),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.detail(vars.reviewId) });
      queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: number) =>
      httpClient(API_ENDPOINTS.reviewDetail(reviewId), { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
    },
  });
}
