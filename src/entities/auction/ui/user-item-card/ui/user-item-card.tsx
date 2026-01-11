/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/lib/utils/utils";

interface UserItemCardProps {
  imageUrl?: string;
  name: string;
  date: string;
  price?: number;
  originalPrice: number;
  discountRate?: number;
  isPriceGray?: boolean;
  imageHref?: string;
  badgeNode?: React.ReactNode;
  actionNode?: React.ReactNode;
  overlayNode?: React.ReactNode;
  footerNode?: React.ReactNode;
  onClick?: () => void;
}

function NoImage() {
  return (
    <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
      No Image
    </div>
  );
}

export function UserItemCard({
  imageUrl,
  name,
  date,
  price,
  originalPrice,
  discountRate,
  isPriceGray = false,
  imageHref,
  badgeNode,
  actionNode,
  overlayNode,
  footerNode,
  onClick,
}: UserItemCardProps) {
  const isInteractive = !!onClick || !!imageHref;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  const renderPrice = () => {
    const priceClassName = cn(
      "font-bold tracking-tight",
      isPriceGray ? "text-muted-foreground" : "text-brand-text"
    );

    if (price != null && discountRate != null && discountRate > 0) {
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs line-through decoration-auto">
            {originalPrice.toLocaleString()}원
          </span>
          <div className="flex items-center gap-2">
            <span className="text-destructive text-xs">-{discountRate}%</span>
            <span className={cn("text-sm", priceClassName)}>{price.toLocaleString()}원</span>
          </div>
        </div>
      );
    }

    return (
      <p className={cn("text-md mt-2 leading-5", priceClassName)}>
        {originalPrice.toLocaleString()}원
      </p>
    );
  };

  return (
    <div
      className={cn(
        "bg-card border-border relative flex w-full flex-col gap-3 rounded-lg border p-4 transition-colors",
        isInteractive && "hover:bg-secondary/20 cursor-pointer"
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {imageHref && (
        <Link
          href={imageHref}
          className="absolute inset-0 z-0"
          aria-label={`${name} 상세로 이동`}
        />
      )}

      <div className="pointer-events-none relative z-10 flex w-full flex-col gap-3">
        <div className="flex w-full items-start gap-3">
          <div className="bg-secondary relative size-28 shrink-0 overflow-hidden rounded-lg">
            {imageUrl ? (
              <Image src={imageUrl} alt={name} fill className="object-cover" />
            ) : (
              <NoImage />
            )}
            {overlayNode && <div className="pointer-events-auto">{overlayNode}</div>}
          </div>

          <div className="flex h-28 flex-1 flex-col justify-between py-0.5">
            <div className="flex flex-col gap-2">
              <div className="pointer-events-auto flex items-center justify-between">
                {badgeNode}
                {actionNode}
              </div>

              <div className="flex flex-col px-1">
                <h3 className="text-foreground line-clamp-1 text-base leading-4 tracking-tight">
                  {name}
                </h3>
                <div className="mt-1.5">{renderPrice()}</div>
              </div>
            </div>
            <p className="text-muted-foreground px-1 text-xs leading-4">{date}</p>
          </div>
        </div>

        {footerNode && <div className="pointer-events-auto">{footerNode}</div>}
      </div>
    </div>
  );
}
