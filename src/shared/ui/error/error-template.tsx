"use client";

import Image from "next/image";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

interface ErrorTemplateProps {
  imageSrc: string;
  title: string;
  description: React.ReactNode;
  onMainClick: () => void;
  onPrevClick: () => void;
  className?: string;
}

export function ErrorTemplate({
  imageSrc,
  title,
  description,
  onMainClick,
  onPrevClick,
  className,
}: ErrorTemplateProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-20",
        className
      )}
    >
      {/* 이미지 영역 */}
      <div className="relative">
        <Image
          src={imageSrc}
          alt={title}
          width={280}
          height={270}
          className="h-auto w-70"
          priority
        />
      </div>

      {/* 타이틀 및 텍스트 영역 */}
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        {/* 타이틀 */}
        <h1 className="text-brand text-3xl font-semibold tracking-tight">{title}</h1>

        {/* 텍스트 */}
        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>

        {/* 고정 텍스트 */}
        <p className="text-muted-foreground text-xs">서비스 이용을 불편하게 해드려 죄송합니다.</p>
      </div>

      {/* 버튼 영역 */}
      <div className="flex w-full max-w-sm gap-3">
        <Button variant="outline" size="lg" className="flex-1" onClick={onPrevClick}>
          이전 페이지
        </Button>
        <Button size="lg" className="flex-1" onClick={onMainClick}>
          메인 페이지
        </Button>
      </div>
    </div>
  );
}
