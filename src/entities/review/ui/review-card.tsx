"use client";

import Image from "next/image";
import Link from "next/link";

import { User } from "lucide-react";

import { ROUTES } from "@/shared/config/routes";
import { Rating, RatingButton } from "@/shared/ui";

import { ReviewType } from "../model/types";

interface ReviewCardProps {
  review: ReviewType;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="bg-card border-border flex w-full flex-col gap-3 rounded-2xl border p-4">
      <div className="flex flex-col gap-3">
        <Link
          href={ROUTES.userReview(review.reviewer.id)}
          className="hover:bg-secondary/50 -mx-1 flex items-start gap-3 rounded-lg px-1 py-1 transition-colors"
        >
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
        </Link>

        <Rating value={review.rating} readOnly className="gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <RatingButton key={i} size={16} className="text-brand" />
          ))}
        </Rating>
      </div>

      <p className="text-foreground/90 text-sm">{review.content}</p>

      <Link
        href={ROUTES.auctionDetail(review.product.id)}
        className="bg-secondary/50 hover:bg-secondary mt-1 flex w-full items-center gap-3 rounded-xl p-3 transition-colors"
      >
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
      </Link>
    </article>
  );
}
