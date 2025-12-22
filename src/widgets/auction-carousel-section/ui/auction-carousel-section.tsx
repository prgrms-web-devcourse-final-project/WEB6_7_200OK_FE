import { AuctionItemCarousel } from "@/entities/auction";
import { AuctionType } from "@/entities/auction/model/types";
import { AuctionCardVariantType } from "@/entities/auction/ui/auction-item-card/model/types";

import { AuctionSectionHeader } from "./auction-section-header";

interface AuctionCarouselSectionProps {
  title: string;
  description: string;
  items: AuctionType[];
  moreHref: string;
  variant: AuctionCardVariantType;
}

export function AuctionCarouselSection({
  title,
  description,
  items,
  moreHref,
  variant,
}: AuctionCarouselSectionProps) {
  return (
    <section aria-label={title} className="flex w-full flex-col gap-4 px-12">
      <AuctionSectionHeader title={title} description={description} href={moreHref} />
      <AuctionItemCarousel items={items} variant={variant} />
    </section>
  );
}
