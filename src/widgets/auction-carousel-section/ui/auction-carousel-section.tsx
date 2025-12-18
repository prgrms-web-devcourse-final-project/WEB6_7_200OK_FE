import type { AuctionItemCardProps } from "@/entities/auction";
import { AuctionItemCarousel } from "@/entities/auction";

import { AuctionSectionHeader } from "./auction-section-header";

interface AuctionCarouselSectionProps {
  title: string;
  description: string;
  items: AuctionItemCardProps[];
  moreHref: string;
}

export function AuctionCarouselSection({
  title,
  description,
  items,
  moreHref,
}: AuctionCarouselSectionProps) {
  return (
    <section aria-label={title} className="flex w-full flex-col gap-4 px-12">
      <AuctionSectionHeader title={title} description={description} href={moreHref} />
      <AuctionItemCarousel items={items} />
    </section>
  );
}
