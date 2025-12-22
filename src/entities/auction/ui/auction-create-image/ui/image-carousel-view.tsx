import type { ItemImage } from "@/entities/auction/ui/auction-create-image/model/image-from-file";
import { ImageAddButton } from "@/entities/auction/ui/auction-create-image/ui/image-add-button";
import { ImagePreviewItem } from "@/entities/auction/ui/auction-create-image/ui/image-preview-item";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel/carousel";

interface ImageCarouselViewProps {
  images: ItemImage[];
  canCheckAdd: boolean;
  imageCount: number;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (id: string) => void;
}

export function ImageCarouselView({
  images,
  canCheckAdd,
  imageCount,
  onImageSelect,
  onRemoveImage,
}: ImageCarouselViewProps) {
  return (
    <Carousel className="block w-full md:hidden">
      <CarouselContent className="-ml-2">
        {canCheckAdd && (
          <CarouselItem className="basis-[30%] pl-2">
            <ImageAddButton
              id="image-upload-mobile"
              imageCount={imageCount}
              onChange={onImageSelect}
            />
          </CarouselItem>
        )}
        {images.map((image, index) => (
          <CarouselItem key={image.id} className="basis-[30%] pl-2">
            <ImagePreviewItem image={image} index={index} onRemove={onRemoveImage} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
