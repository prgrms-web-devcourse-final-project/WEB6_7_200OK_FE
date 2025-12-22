import { AuctionType } from "@/entities/auction/model/types";
import { AuctionItemCard } from "@/entities/auction/ui/auction-item-card";
import { AuctionCardVariantType } from "@/entities/auction/ui/auction-item-card/model/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel/carousel";

interface AuctionItemCarouselProps {
  items: AuctionType[];
  variant: AuctionCardVariantType;
}

export function AuctionItemCarousel({ items, variant }: AuctionItemCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        containScroll: "trimSnaps",
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            key={item.auctionId}
            className="sm:basis-1/2 md:basis-2/5 lg:basis-1/3 xl:basis-1/4"
          >
            <AuctionItemCard
              {...item}
              variant={variant}
              rank={variant === "ranking" ? index + 1 : undefined}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-10 disabled:hidden" />
      <CarouselNext className="-right-10 disabled:hidden" />
    </Carousel>
  );
}
