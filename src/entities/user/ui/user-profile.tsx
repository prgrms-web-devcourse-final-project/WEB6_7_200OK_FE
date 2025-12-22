"use client";

import Image from "next/image";

import { User } from "lucide-react";

import { Rating, RatingButton } from "@/shared/ui";

export function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card border-border flex w-full flex-col gap-6 rounded-lg border p-4">
      <div className="flex items-center gap-6">{children}</div>
    </div>
  );
}

// 아바타 UI (이미지 표시만 담당)
export function UserAvatar({
  src,
  alt,
  children,
}: {
  src?: string;
  alt: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative size-20 shrink-0">
      <div className="bg-secondary flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        {src ? (
          <Image src={src} alt={alt} fill className="rounded-full object-cover" />
        ) : (
          <User className="text-foreground size-10" />
        )}
      </div>
      {children}
    </div>
  );
}

// 이름 텍스트 UI
export function UserName({ children }: { children: React.ReactNode }) {
  return <h2 className="text-foreground text-xl font-semibold">{children}</h2>;
}

// 이메일 텍스트 UI
export function UserEmail({ email }: { email: string }) {
  return <p className="text-muted-foreground text-base">{email}</p>;
}

// 평점 정보 UI
export function UserRatingInfo({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="mt-1 flex items-center gap-1">
      <Rating value={rating} readOnly className="gap-0">
        {[1, 2, 3, 4, 5].map((i) => (
          <RatingButton key={i} size={20} className="text-brand" />
        ))}
      </Rating>

      <div className="flex items-center gap-1">
        <span className="text-foreground text-base">{rating}</span>
        <span className="text-muted-foreground text-sm">
          ({reviewCount}
          <span className="hidden min-[400]:inline">개의 후기</span>)
        </span>
      </div>
    </div>
  );
}
