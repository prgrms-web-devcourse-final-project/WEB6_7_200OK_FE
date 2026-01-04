import React from "react";

import Image from "next/image";

import { cn } from "@/shared/lib/utils/utils";

interface UserItemCardProps {
  imageUrl?: string;
  name: string;
  date: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  isPriceGray?: boolean;
  badgeNode?: React.ReactNode;
  actionNode?: React.ReactNode;
  overlayNode?: React.ReactNode;
  footerNode?: React.ReactNode;
  onClick?: () => void;
}

export function UserItemCard({
  imageUrl,
  name,
  date,
  price,
  originalPrice,
  discountRate,
  isPriceGray = false,
  badgeNode,
  actionNode,
  overlayNode,
  footerNode,
  onClick,
}: UserItemCardProps) {
  const isInteractive = !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const interactiveProps = isInteractive
    ? {
        role: "button" as const,
        tabIndex: 0,
        onKeyDown: handleKeyDown,
        onClick,
      }
    : {};

  return (
    <article
      {...interactiveProps}
      className={cn(
        "bg-card border-border flex w-full flex-col gap-3 rounded-lg border p-4 transition-colors",
        isInteractive &&
          "hover:bg-secondary/20 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      )}
    >
      <div className="flex w-full items-start gap-3">
        <div className="bg-secondary relative size-28 shrink-0 overflow-hidden rounded-lg">
          {imageUrl ? (
            <Image src={imageUrl} alt={name} fill className="object-cover" />
          ) : (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
              No Image
            </div>
          )}
          {overlayNode}
        </div>

        <div className="flex h-28 flex-1 flex-col justify-between py-0.5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              {badgeNode}
              {actionNode}
            </div>
            <div className="flex flex-col px-1">
              <h3 className="text-foreground line-clamp-1 text-base leading-4 tracking-tight">
                {name}
              </h3>
              <div className="mt-1.5">
                {originalPrice && discountRate ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-muted-foreground text-xs line-through decoration-auto">
                      {originalPrice.toLocaleString()}원
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-destructive text-xs">-{discountRate}%</span>
                      <span
                        className={cn(
                          "text-sm font-bold",
                          isPriceGray ? "text-muted-foreground" : "text-brand-text"
                        )}
                      >
                        {price.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                ) : (
                  <p
                    className={cn(
                      "text-md mt-2 leading-5 font-bold tracking-tight",
                      isPriceGray ? "text-muted-foreground" : "text-brand-text"
                    )}
                  >
                    {price.toLocaleString()}원
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="text-muted-foreground px-1 text-xs leading-4">{date}</p>
        </div>
      </div>
      {footerNode}
    </article>
  );
}
