import { ImagePlus } from "lucide-react";

import { MAX_IMAGES } from "@/entities/auction/ui/auction-create-image/model/image-from-file";
import { Input } from "@/shared/ui";

interface ImageAddButtonProps {
  id: string;
  imageCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageAddButton({ id, imageCount, onChange }: ImageAddButtonProps) {
  return (
    <label
      htmlFor={id}
      aria-label="이미지 추가"
      className="hover:bg-accent border-input dark:bg-input/30 relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-md border bg-transparent transition-colors"
    >
      <Input
        id={id}
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <ImagePlus className="text-muted-foreground size-6" />
      <p className="text-muted-foreground text-xs">
        {imageCount}/{MAX_IMAGES}
      </p>
    </label>
  );
}
