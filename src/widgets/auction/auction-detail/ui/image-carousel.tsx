import Image from "next/image";

import { AuctionStatusType, LiveBadge, UpcomingBadge } from "@/entities/auction";
import AuctionViewerLogBadge from "@/features/auction/auction-log/ui/auction-viewer-log-badge";
import { cn } from "@/shared/lib/utils/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui";

const images = [
  "https://picsum.photos/seed/auction--2114285778-1/800/800",
  "https://picsum.photos/seed/auction--2114285778-2/800/800",
  "https://picsum.photos/seed/auction--2114285778-3/800/800",
];
/* TODO: 임시 주석
interface ImageCarouselProps {
  images: string[];
  */
interface ImageCarouselProps {
  className?: string;
  status: AuctionStatusType;
}

export default function ImageCarousel({ className, status }: ImageCarouselProps) {
  return (
    <div className={cn("relative flex max-w-full", className)}>
      <div className="absolute top-3 left-3 z-2 inline-flex gap-2">
        {status === "PROCESS" && <LiveBadge className="static" />}
        {status === "SCHEDULED" && <UpcomingBadge className="static" />}
        <AuctionViewerLogBadge />
      </div>
      <Carousel className="h-162 w-full shrink">
        <CarouselContent className="h-162">
          {images.map((image) => (
            <CarouselItem key={image}>
              <Image
                src={image}
                alt="auction image-carousel"
                width={648}
                height={648}
                className="h-full w-full rounded-2xl object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
