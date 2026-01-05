"use client";

import { Box } from "lucide-react";

import type { SellerType } from "@/features/auction/auction-sale";
import { useSellerInfo } from "@/features/auction/auction-sale/hook/use-seller-info";
import AuctionDetailSellerReviewHeader from "@/features/auction/auction-sale/ui/auction-detail-seller-review-header";
import AuctionDetailSellerReviewList from "@/features/auction/auction-sale/ui/auction-detail-seller-review-list";
import AuctionDetailSellerSales from "@/features/auction/auction-sale/ui/auction-detail-seller-sales";
import { EmptyState, Skeleton } from "@/shared/ui";

interface AuctionDetailSellerInfoProps {
  seller: SellerType;
}

export default function AuctionDetailSellerInfo({ seller }: AuctionDetailSellerInfoProps) {
  const { data, isLoading, error } = useSellerInfo(seller.sellerId);
  if (error) {
    return (
      <EmptyState
        Icon={Box}
        title="현재 판매자 정보가 없어요."
        description="판매자에 대한 정보가 없습니다."
      />
    );
  }
  if (isLoading) {
    return <Skeleton className="h-72" />;
  }
  if (!data) {
    return (
      <EmptyState
        Icon={Box}
        title="현재 판매자 정보가 없어요."
        description="판매자에 대한 정보가 없습니다."
      />
    );
  }
  return (
    <div className="flex w-full flex-col gap-4">
      <AuctionDetailSellerReviewHeader reviewCount={data.totalReviews} rating={data.rating} />
      <AuctionDetailSellerReviewList buyers={data.buyers} sellerId={data.sellerId} />
      <AuctionDetailSellerSales auctions={data.auctions} />
    </div>
  );
}
