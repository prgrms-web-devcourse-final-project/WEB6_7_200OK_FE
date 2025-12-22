import { useCallback, useMemo } from "react";

import { ImagePlus } from "lucide-react";

import {
  MAX_IMAGES,
  itemImageFromFile,
  type ItemImage,
  ImageAddButton,
  ImagePreviewItem,
  ImageCarouselView,
} from "@/entities/auction";
import FileInput from "@/shared/ui/input/file-input";

interface ImageUploadSectionProps {
  images: ItemImage[];
  onImagesChange: (images: ItemImage[]) => void;
}

export function ImageUploadSection({ images, onImagesChange }: ImageUploadSectionProps) {
  const { canCheckAdd, imageCount } = useMemo(
    () => ({
      canCheckAdd: images.length < MAX_IMAGES,
      imageCount: images.length,
    }),
    [images.length]
  );

  const processImageFiles = useCallback(
    async (files: FileList, currentImages: ItemImage[]) => {
      const availableSlots = MAX_IMAGES - currentImages.length;
      if (availableSlots <= 0) return;

      const filesToAdd = Array.from(files).slice(0, availableSlots);

      // 이미지 추가 시 검증
      try {
        const newImages = await Promise.all(filesToAdd.map(itemImageFromFile));
        onImagesChange([...currentImages, ...newImages]);
      } catch (error) {
        // TODO: 사용자에게 에러 알림 (toast 등)
        console.error("Failed to load images:", error);
      }
    },
    [onImagesChange]
  );

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!files || files.length === 0) return;

      processImageFiles(files, images);
      e.target.value = "";
    },
    [images, processImageFiles]
  );

  const handleRemoveImage = useCallback(
    (removeImageId: string) => {
      onImagesChange(images.filter((image) => image.id !== removeImageId));
    },
    [images, onImagesChange]
  );

  return (
    <>
      <label htmlFor="image-upload" className="mb-2 block text-sm font-medium">
        이미지
      </label>
      {/* 이미지 한장도 없는 경우 */}
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
        // 이미지가 있는 경우
        <>
          {/* 모바일 캐러셀 뷰 (md hidden 적용) */}
          <ImageCarouselView
            images={images}
            canCheckAdd={canCheckAdd}
            imageCount={imageCount}
            onImageSelect={handleImageSelect}
            onRemoveImage={handleRemoveImage}
          />
          {/* 데스크톱 뷰 (md 이상 표시) */}
          <div className="hidden grid-cols-5 gap-2 md:grid">
            {/* 이미지가 추가 가능한 경우 */}
            {canCheckAdd && (
              <ImageAddButton
                id="image-upload-desktop"
                imageCount={imageCount}
                onChange={handleImageSelect}
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
