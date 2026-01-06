"use client";

import { useQuery } from "@tanstack/react-query";

import { auctionsQueryClient } from "@/screens/main/model/auctions-query";
import { SECTIONS } from "@/screens/main/model/sections";
import { useServerTimeSync } from "@/shared/lib/hooks/use-server-time-sync";
import { Container } from "@/shared/ui";
import { AuctionCarouselSection } from "@/widgets/auction/auction-carousel-section";

export default function AuctionsClient() {
  const { data, isLoading, isError } = useQuery({ ...auctionsQueryClient });

  useServerTimeSync({
    serverTime: data?.serverAt,
    queryKey: auctionsQueryClient.queryKey,
  });

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
        />
      ))}
    </Container>
  );
}
