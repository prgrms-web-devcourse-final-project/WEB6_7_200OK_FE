import Image from "next/image";

import { ArrowRight, TrendingDown } from "lucide-react";

import HeroAuction from "@/shared/assets/images/hero-auction.svg";
import { Button } from "@/shared/ui";

export function HeroSection() {
  return (
    <section className="from-brand to-brand-secondary mx-auto flex h-85 w-full items-center justify-center bg-linear-to-b whitespace-nowrap">
      <div className="flex w-fit max-w-7xl min-w-115 items-center gap-1 md:gap-15 xl:gap-30">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-5">
            <div className="text-brand-contrast border-brand/30 bg-brand/30 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-2">
              <TrendingDown className="size-3.5" />
              <span className="text-xs">네덜란드 경매 기반</span>
            </div>

            <div className="text-brand-contrast flex flex-col gap-2">
              <h2 className="text-2xl font-bold lg:text-3xl">가격이 내려가는 특별한 경매</h2>
              <p className="text-sm">
                시간이 지날수록 가격이 내려갑니다. 원하는 가격에 즉시 입찰하세요!
              </p>
            </div>
          </div>

          <Button variant="outline" className="text-brand hover:text-brand w-fit px-1.5">
            <span className="text-xs">가이드 보기</span>
            <ArrowRight />
          </Button>
        </div>

        <div className="relative hidden h-67 w-67 shrink-0 md:block">
          <Image src={HeroAuction} alt="경매 일러스트레이션" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
