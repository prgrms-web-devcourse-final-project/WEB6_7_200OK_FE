"use client";

import { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils/utils";

interface Base64ImageProps extends Omit<ComponentProps<"img">, "src"> {
  src: string;
  alt: string;
  className?: string;
}

export function Base64Image({ src, alt, className, ...props }: Base64ImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-contain", className)}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
