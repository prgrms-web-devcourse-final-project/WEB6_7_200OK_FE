import { X } from "lucide-react";

import { type ItemImage } from "@/entities/auction";
import Base64Image from "@/shared/ui/base64-image/base64-image";
import Button from "@/shared/ui/button/button";

interface ImagePreviewItemProps {
  image: ItemImage;
  index: number;
  onRemove: (id: string) => void;
}

export function ImagePreviewItem({ image, index, onRemove }: ImagePreviewItemProps) {
  return (
    <div
      className="border-input dark:bg-input/30 group relative aspect-square overflow-hidden rounded-md border bg-transparent"
      role="figure"
    >
      <figcaption className="sr-only">
        이미지 {index + 1}
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
      </figcaption>
    </div>
  );
}
