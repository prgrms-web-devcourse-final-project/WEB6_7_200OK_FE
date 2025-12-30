"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { auctionsQuery } from "@/screens/main/model/auctions-query";
import { useServerTimeNow } from "@/shared/lib/hooks/use-server-time-now";
import { useServerTimeStore } from "@/shared/lib/hooks/use-server-time-store";
import { Container } from "@/shared/ui";
import { AuctionCarouselSection } from "@/widgets/auction/auction-carousel-section";

const SECTIONS = [
  {
    key: "popularList",
    title: "🔥 실시간 인기 랭킹",
    description: "가장 인기있는 상품 모아보기!",
    variant: "ranking",
    moreHref: null,
  },
  {
    key: "processList",
    title: "⚡ 경매 진행 중",
    description: "실시간 경매가 진행 중인 상품을 모아봤어요!",
    variant: "live",
    moreHref: "#",
  },
  {
    key: "scheduledList",
    title: "⏳ 경매 진행 예정",
    description: "경매가 곧 진행될 거예요!",
    variant: "upcoming",
    moreHref: "#",
  },
] as const;

export default function AuctionsClient() {
  const { data, isLoading, isError } = useQuery({
    ...auctionsQuery,
  });

  const setServerTime = useServerTimeStore((s) => s.setServerTime);
  const now = useServerTimeNow();

  useEffect(() => {
    const serverAt = data?.serverAt;

    if (!serverAt) return;

    setServerTime(serverAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.serverAt]);

  return (
    <Container className="my-7 flex flex-col gap-15">
      {SECTIONS.map((section) => (
        <AuctionCarouselSection
          key={section.key}
          title={section.title}
          description={section.description}
          moreHref={section.moreHref}
          variant={section.variant}
          isLoading={isLoading}
          isError={isError}
          items={data?.[section.key]}
          now={now}
        />
      ))}
    </Container>
  );
}
