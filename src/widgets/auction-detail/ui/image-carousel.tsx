import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel/carousel";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <div className="flex max-w-full">
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
