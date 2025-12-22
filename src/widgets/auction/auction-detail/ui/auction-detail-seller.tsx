import { SellerType } from "@/features/auction/auction-sale";
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

      <div className="flex items-center gap-1">
        <Rating defaultValue={1} readOnly>
          <RatingButton className="text-brand" size={24} />
        </Rating>
        <span className="text-lg">{seller.rating}</span>
      </div>

      <span className="text-muted-foreground cursor-pointer text-lg underline">
        리뷰 {seller.reviewCount}
      </span>
    </div>
  );
}
