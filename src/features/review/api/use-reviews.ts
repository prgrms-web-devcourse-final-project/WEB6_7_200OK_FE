"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import dayjs from "dayjs";

import type { ReviewType } from "@/entities/review";
import { purchaseKeys } from "@/features/purchase/api/use-purchases";
import { httpClient } from "@/shared/api/client";
import type { SliceResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface ReviewResponseItem {
  reviewId: number;
  auctionId: number;
  buyerId: number;
  nickname: string;
  userImageUrl: string;
  rating: number;
  content: string;
  sellerId: number;
  sellerName: string;
  sellerProfileImage: string;
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
  auctionImageUrl: string;
  nickname: string;
  sellerProfileImage: string;
  rating: number;
  content: string;
}

export const reviewKeys = {
  all: ["user", "reviews"] as const,
  list: (userId: number) => [...reviewKeys.all, "list", userId] as const,
  detail: (reviewId: number) => [...reviewKeys.all, "detail", reviewId] as const,
};

const fetchUserReviews = async (
  userId: number,
  pageParam: number
): Promise<SliceResponseType<ReviewType>> => {
  const response = await httpClient<ReviewData>(
    `${API_ENDPOINTS.userReviews(userId)}?page=${pageParam}&size=5`,
    { method: "GET" }
  );

  const { data } = response;

  if (!data) {
    return {
      slice: [],
      hasNext: false,
      page: pageParam,
      size: 5,
      timeStamp: "",
    };
  }

  const mappedSlice = data.slice.map((item) => ({
    id: item.reviewId,
    rating: item.rating,
    content: item.content,
    date: item.reviewedAt ? dayjs(item.reviewedAt).format("YYYY-MM-DD") : "",
    reviewer: { id: item.buyerId, name: item.nickname, avatarUrl: item.userImageUrl },
    product: { id: item.auctionId, name: item.auctionTitle, imageUrl: item.auctionImageUrl },
    seller: { id: item.sellerId, name: item.sellerName, avatarUrl: item.sellerProfileImage },
  }));

  return {
    ...data,
    slice: mappedSlice,
  };
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
    reviewer: { id: 0, name: "", avatarUrl: "" },
    product: { id: data.auctionId, name: data.auctionTitle, imageUrl: data.auctionImageUrl },
    seller: { id: data.sellerId, name: data.nickname, avatarUrl: data.sellerProfileImage },
  };
};

export function useReviews(userId: number) {
  return useInfiniteQuery({
    queryKey: reviewKeys.list(userId),
    queryFn: ({ pageParam = 0 }) => fetchUserReviews(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
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
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: number; data: UpdateReviewRequest }) =>
      httpClient(API_ENDPOINTS.reviewDetail(reviewId), { method: "PATCH", body: data }),

    onSuccess: (_, vars) => {
      const { reviewId, data: updatedData } = vars;

      queryClient.setQueryData<ReviewType>(reviewKeys.detail(reviewId), (old) =>
        old ? { ...old, rating: updatedData.rating, content: updatedData.content } : old
      );

      queryClient.setQueriesData<InfiniteData<SliceResponseType<ReviewType>>>(
        { queryKey: reviewKeys.all },
        (oldData) => {
          if (!oldData?.pages) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              slice: page.slice.map((review) =>
                review.id === reviewId
                  ? { ...review, rating: updatedData.rating, content: updatedData.content }
                  : review
              ),
            })),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
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
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
      queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
    },
  });
}
