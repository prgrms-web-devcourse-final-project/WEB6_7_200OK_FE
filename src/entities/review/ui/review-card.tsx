"use client";

import Image from "next/image";

import { User } from "lucide-react";

import { Rating, RatingButton } from "@/shared/ui/rating/rating";

import { Review } from "../model/types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="bg-card border-border flex w-full flex-col gap-3 rounded-2xl border p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="bg-secondary relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
            {review.reviewer.avatarUrl ? (
              <Image
                src={review.reviewer.avatarUrl}
                alt={review.reviewer.name}
                fill
                className="object-cover"
              />
            ) : (
              <User className="text-foreground size-6" />
            )}
          </div>
          <div className="flex flex-col pt-1">
            <span className="text-foreground text-base">{review.reviewer.name}</span>
            <span className="text-muted-foreground text-xs">{review.date}</span>
          </div>
        </div>
        <Rating value={review.rating} readOnly className="gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <RatingButton key={i} size={16} className="text-brand" />
          ))}
        </Rating>
      </div>
      <p className="text-foreground/90 text-sm">{review.content}</p>
      <div className="bg-secondary/50 mt-1 flex w-full items-center gap-3 rounded-xl p-3">
        <div className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-xl">
          {review.product.imageUrl && (
            <Image
              src={review.product.imageUrl}
              alt={review.product.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">거래 상품</span>
          <span className="text-foreground text-sm">{review.product.name}</span>
        </div>
      </div>
    </article>
  );
}
