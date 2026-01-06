import { useCallback } from "react";

import { ImagePlus } from "lucide-react";

import {
  MAX_IMAGES,
  itemImageFromFile,
  type ItemImage,
  ImageAddButton,
  ImagePreviewItem,
  ImageCarouselView,
} from "@/entities/auction";
import {
  validateImageFiles,
  MAX_TOTAL_IMAGE_SIZE,
} from "@/shared/lib/utils/image-validation/image-validation";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import FileInput from "@/shared/ui/input/file-input";

interface ImageUploadSectionProps {
  images: ItemImage[];
  onImagesChange: (images: ItemImage[]) => void;
}

export function ImageUploadSection({ images, onImagesChange }: ImageUploadSectionProps) {
  const canCheckAdd = images.length < MAX_IMAGES;
  const imageCount = images.length;

  const processImageFiles = useCallback(
    async (files: FileList, currentImages: ItemImage[]) => {
      const availableSlots = MAX_IMAGES - currentImages.length;
      if (availableSlots <= 0) return;

      const filesArray = Array.from(files);

      // 이미지 파일 검증
      const validationResult = validateImageFiles(filesArray);

      if (validationResult.invalidTypeFiles.length > 0) {
        const fileNames = validationResult.invalidTypeFiles.map((file) => file.name).join(", ");
        showToast.error(
          `지원하지 않는 파일 형식입니다. JPG, PNG, GIF, WEBP 파일만 업로드 가능합니다. (${fileNames})`
        );
        return;
      }

      if (validationResult.oversizedFiles.length > 0) {
        const fileNames = validationResult.oversizedFiles.map((file) => file.name).join(", ");
        showToast.error(`이미지 하나당 최대 10MB를 초과할 수 없습니다. (${fileNames})`);
        return;
      }

      // 기존 이미지들의 총 크기 계산
      const existingImagesTotalSize = currentImages.reduce(
        (sum, image) => sum + (image.file?.size || 0),
        0
      );

      // 새로 추가할 파일들의 총 크기
      const newFilesTotalSize = validationResult.validFiles.reduce(
        (sum, file) => sum + file.size,
        0
      );

      // 이미지의 총 크기가 50MB를 초과하는지 검증
      if (existingImagesTotalSize + newFilesTotalSize > MAX_TOTAL_IMAGE_SIZE) {
        showToast.error(`전체 이미지 파일 크기는 50MB를 초과할 수 없습니다.`);
        return;
      }

      const filesToAdd = validationResult.validFiles.slice(0, availableSlots);

      // 이미지 추가 시 검증
      try {
        const newImages = await Promise.all(filesToAdd.map(itemImageFromFile));
        onImagesChange([...currentImages, ...newImages]);
      } catch {
        showToast.error("이미지 처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
