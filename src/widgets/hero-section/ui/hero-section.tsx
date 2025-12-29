import Image from "next/image";

import { ArrowRight, TrendingDown } from "lucide-react";

import HeroAuction from "@/shared/assets/images/hero-auction.svg";

export function HeroSection() {
  return (
    <section className="from-brand to-brand-secondary mx-auto flex h-85 w-full items-center justify-center bg-linear-to-b select-none">
      <div className="flex w-fit max-w-7xl items-center gap-1 md:gap-15 xl:gap-30">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-5">
            <div className="text-brand-contrast border-brand/30 inline-flex w-fit items-center gap-1.5 rounded-full border bg-white/10 px-3 py-2">
              <TrendingDown className="size-3.5" />
              <span className="text-xs">네덜란드 경매 기반</span>
            </div>

            <div className="text-brand-contrast flex flex-col gap-2">
              <h2 className="text-2xl font-bold lg:text-3xl">가격이 내려가는 특별한 경매</h2>
              <p className="text-sm">
                시간이 지날수록 가격이 내려갑니다.
                <br />
                원하는 가격에 즉시 입찰하세요!
              </p>
            </div>
          </div>

          <button
            type="button"
            className="text-brand inline-flex w-fit items-center gap-1 rounded-sm bg-white px-3 py-2 hover:bg-zinc-50"
          >
            <span className="text-xs">가이드 보기</span>
            <ArrowRight className="size-4" />
          </button>
        </div>

        <div className="relative hidden h-67 w-67 shrink-0 md:block">
          <Image
            src={HeroAuction}
            alt="경매 일러스트레이션"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
