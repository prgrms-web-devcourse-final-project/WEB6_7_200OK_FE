"use client";

import { useCallback } from "react";

import { ImagePlus, X } from "lucide-react";

import { MAX_IMAGES, itemImageFromFile, type ItemImage } from "@/entities/auction";
import Base64Image from "@/shared/ui/base64-image/base64-image";
import Button from "@/shared/ui/button/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel/carousel";
import FileInput from "@/shared/ui/input/file-input";

interface ImageUploadSectionProps {
  images: ItemImage[];
  onImagesChange: (images: ItemImage[]) => void;
}

interface ImageAddButtonProps {
  id: string;
  imageCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

function ImageAddButton({ id, imageCount, onChange, disabled }: ImageAddButtonProps) {
  return (
    <label
      htmlFor={id}
      className="hover:bg-accent border-input dark:bg-input/30 relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-md border bg-transparent transition-colors"
    >
      <input
        id={id}
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        disabled={disabled}
      />
      <ImagePlus className="text-muted-foreground size-6" />
      <p className="text-muted-foreground text-xs">
        {imageCount}/{MAX_IMAGES}
      </p>
    </label>
  );
}

interface ImagePreviewItemProps {
  image: ItemImage;
  index: number;
  onRemove: (id: string) => void;
}

function ImagePreviewItem({ image, index, onRemove }: ImagePreviewItemProps) {
  return (
    <div className="border-input dark:bg-input/30 group relative aspect-square overflow-hidden rounded-md border bg-transparent">
      <Base64Image src={image.url} alt={`이미지 ${index + 1}`} />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => onRemove(image.id)}
        className="bg-accent text-accent-foreground absolute top-1 right-1 h-6 w-6 rounded-full opacity-100 transition-opacity"
        aria-label="이미지 삭제"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}

export function ImageUploadSection({ images, onImagesChange }: ImageUploadSectionProps) {
  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!files || files.length === 0) return;

      const remainingSlots = MAX_IMAGES - images.length;
      if (remainingSlots <= 0) return;

      const filesToAdd = Array.from(files).slice(0, remainingSlots);

      Promise.all(filesToAdd.map(itemImageFromFile))
        .then((newImages) => {
          onImagesChange([...images, ...newImages]);
        })
        .catch((error) => {
          console.error("Failed to load images:", error);
        });

      e.target.value = "";
    },
    [images, onImagesChange]
  );

  const handleRemoveImage = useCallback(
    (idToRemove: string) => {
      onImagesChange(images.filter((image) => image.id !== idToRemove));
    },
    [images, onImagesChange]
  );

  const canAddMore = images.length < MAX_IMAGES;
  const imageCount = images.length;

  return (
    <>
      <label htmlFor="image-upload" className="mb-2 block text-sm font-medium">
        이미지
      </label>
      {imageCount === 0 ? (
        <FileInput
          id="image-upload"
          Icon={ImagePlus}
          value="이미지"
          placeholder="이미지를 선택하세요"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
        />
      ) : (
        <>
          {/* 모바일: Carousel (768px 미만) */}
          <Carousel className="block w-full md:hidden">
            <CarouselContent className="-ml-2">
              {canAddMore && (
                <CarouselItem className="basis-[30%] pl-2">
                  <ImageAddButton
                    id="image-upload-mobile"
                    imageCount={imageCount}
                    onChange={handleImageSelect}
                    disabled={!canAddMore}
                  />
                </CarouselItem>
              )}
              {images.map((image, index) => (
                <CarouselItem key={image.id} className="basis-[30%] pl-2">
                  <ImagePreviewItem image={image} index={index} onRemove={handleRemoveImage} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {imageCount > 0 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>

          {/* 데스크톱: Grid (768px 이상) */}
          <div className="hidden grid-cols-5 gap-2 md:grid">
            {canAddMore && (
              <ImageAddButton
                id="image-upload-desktop"
                imageCount={imageCount}
                onChange={handleImageSelect}
                disabled={!canAddMore}
              />
            )}
            {images.map((image, index) => (
              <ImagePreviewItem
                key={image.id}
                image={image}
                index={index}
                onRemove={handleRemoveImage}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
