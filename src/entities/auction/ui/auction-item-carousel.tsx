import { AuctionItemCard, AuctionItemCardProps } from "@/entities/auction/ui/auction-item-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel/carousel";

export function AuctionItemCarousel({ items }: { items: AuctionItemCardProps[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
        containScroll: "keepSnaps",
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem
            key={item.auctionId}
            className="sm:basis-1/2 md:basis-2/5 lg:basis-1/3 xl:basis-1/4"
          >
            <AuctionItemCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-10 disabled:hidden" />
      <CarouselNext className="-right-10 disabled:hidden" />
    </Carousel>
  );
}
