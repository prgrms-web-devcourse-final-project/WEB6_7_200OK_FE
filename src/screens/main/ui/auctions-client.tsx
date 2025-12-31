"use client";

import { useCallback, useEffect, useRef } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { auctionsQuery } from "@/screens/main/model/auctions-query";
import { SECTIONS } from "@/screens/main/model/sections";
import { useServerTimeStore } from "@/shared/lib/hooks/use-server-time-store";
import { useServerTimeTicker } from "@/shared/lib/hooks/use-server-time-ticker";
import { Container } from "@/shared/ui";
import { AuctionCarouselSection } from "@/widgets/auction/auction-carousel-section";

export default function AuctionsClient() {
  const { data, isLoading, isError } = useQuery({ ...auctionsQuery });

  const queryClient = useQueryClient();
  const expireQueuedRef = useRef(false);

  const setServerTime = useServerTimeStore((state) => state.setServerTime);

  useServerTimeTicker();

  useEffect(() => {
    const serverAt = data?.serverAt;
    if (!serverAt) return;

    setServerTime(serverAt);
  }, [data?.serverAt, setServerTime]);

  const handleExpire = useCallback(() => {
    if (expireQueuedRef.current) return;
    expireQueuedRef.current = true;

    setTimeout(() => {
      expireQueuedRef.current = false;
      queryClient.invalidateQueries({ queryKey: auctionsQuery.queryKey });
    }, 0);
  }, [queryClient]);

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
          onExpire={handleExpire}
        />
      ))}
    </Container>
  );
}
