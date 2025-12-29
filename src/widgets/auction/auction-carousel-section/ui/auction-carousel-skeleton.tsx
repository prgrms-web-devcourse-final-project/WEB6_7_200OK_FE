import { type AuctionCardVariantType } from "@/entities/auction/ui/auction-item-card/model/types";
import { CardSkeleton } from "@/entities/auction/ui/auction-item-card/ui/card-skeleton";

export default function AuctionCarouselSkeleton({ variant }: { variant: AuctionCardVariantType }) {
  return (
    <div className="flex w-full gap-4 overflow-hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="shrink-0 basis-[70%] sm:basis-1/2 md:basis-2/5 lg:basis-1/3 xl:basis-1/4"
        >
          <CardSkeleton variant={variant} />
        </div>
      ))}
    </div>
  );
}
