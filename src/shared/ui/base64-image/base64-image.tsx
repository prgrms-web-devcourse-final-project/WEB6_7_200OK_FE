import { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils/utils";

interface Base64ImageProps extends Omit<ComponentProps<"img">, "src"> {
  src: string;
  alt: string;
  className?: string;
}

function isValidImageDataUri(src: string): boolean {
  return typeof src === "string" && src.startsWith("data:image/");
}

export default function Base64Image({ src, alt, className, ...props }: Base64ImageProps) {
  const safeSrc = isValidImageDataUri(src) ? src : "";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={safeSrc}
      alt={alt}
      className={cn("h-full w-full object-contain", className)}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
