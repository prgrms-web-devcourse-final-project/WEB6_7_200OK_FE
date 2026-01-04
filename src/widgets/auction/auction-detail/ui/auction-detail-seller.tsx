"use client";

import { SellerType } from "@/features/auction/auction-sale";
import { useSellerInfo } from "@/features/auction/auction-sale/hook/use-seller-info";
import { Avatar, AvatarFallback, AvatarImage, Rating, RatingButton } from "@/shared/ui";

interface AuctionDetailSellerProps {
  seller: SellerType;
}

export default function AuctionDetailSeller({ seller }: AuctionDetailSellerProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Avatar className="size-6 rounded-sm">
          <AvatarImage src={seller.profileImageUrl} />
          <AvatarFallback className="rounded-sm">{seller.username}</AvatarFallback>
        </Avatar>
        <span className="text-lg">{seller.username}</span>
      </div>
      <AuctionDetailSellerInfo sellerId={seller.sellerId} />
    </div>
  );
}

function AuctionDetailSellerInfo({ sellerId }: { sellerId: number }) {
  const { data, isLoading, error } = useSellerInfo(sellerId);
  console.log(data);
  if (error) {
    return <>데이터 없음</>;
  }
  if (isLoading) {
    return <>...</>;
  }
  return (
    <>
      <div className="flex items-center gap-1">
        <Rating defaultValue={1} readOnly>
          <RatingButton className="text-brand" size={24} />
        </Rating>
        <span className="text-lg">2</span>
      </div>

      <span className="text-muted-foreground cursor-pointer text-lg underline">리뷰</span>
    </>
  );
}
