import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel/carousel";

interface ImageType {
  src: string;
  id: string;
}

interface ImageCarouselProps {
  images: ImageType[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <div className="flex max-w-full">
      <Carousel className="h-162 w-full shrink">
        <CarouselContent className="h-162">
          {images.map((v) => (
            <CarouselItem key={v.id}>
              <Image
                src={v.src}
                alt="image-carousel"
                width={648}
                height={648}
                className="h-full w-full rounded-2xl object-cover dark:brightness-[0.2] dark:grayscale"
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
