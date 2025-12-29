import { Inbox, RotateCcw } from "lucide-react";

import { AuctionItemCarousel } from "@/entities/auction";
import { AuctionType } from "@/entities/auction/model/types";
import { AuctionCardVariantType } from "@/entities/auction/ui/auction-item-card/model/types";
import { EmptyState } from "@/shared/ui";
import AuctionCarouselSkeleton from "@/widgets/auction/auction-carousel-section/ui/auction-carousel-skeleton";

import { AuctionSectionHeader } from "./auction-section-header";

interface AuctionCarouselSectionProps {
  title: string;
  description: string;
  moreHref: string | null;
  variant: AuctionCardVariantType;
  isLoading: boolean;
  isError: boolean;
  items?: AuctionType[];
  now: number;
}

export function AuctionCarouselSection({
  title,
  description,
  moreHref,
  variant,
  isLoading,
  isError,
  items,
  now,
}: AuctionCarouselSectionProps) {
  const hasItems = Array.isArray(items) && items.length > 0;

  const renderContent = () => {
    if (isLoading && !items) return <AuctionCarouselSkeleton variant={variant} />;

    if (isError)
      return (
        <EmptyState
          title="데이터를 불러오지 못했어요"
          description="잠시 후 다시 시도해주세요"
          Icon={RotateCcw}
        />
      );

    if (!hasItems)
      return (
        <EmptyState
          title="등록된 경매가 없습니다"
          description="아직 진행 중인 경매가 없어요"
          Icon={Inbox}
        />
      );

    return <AuctionItemCarousel items={items} variant={variant} now={now} />;
  };

  return (
    <section aria-label={title} className="flex min-h-100 w-full flex-col gap-4 px-12">
      <AuctionSectionHeader title={title} description={description} href={moreHref} />
      {renderContent()}
    </section>
  );
}
