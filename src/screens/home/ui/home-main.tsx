import { HomeAuctionsData } from "@/screens/home/model/types";
import { Container } from "@/shared/ui";
import { AuctionCarouselSection } from "@/widgets/auction/auction-carousel-section";
import { HeroSection } from "@/widgets/hero-section";

interface HomeMainProps {
  data: HomeAuctionsData;
}

export default function HomeMain({ data }: HomeMainProps) {
  const { popularList, processList, scheduledList } = data;

  return (
    <main>
      <HeroSection />
      <Container className="flex flex-col gap-15">
        <AuctionCarouselSection
          title="🔥 실시간 인기 랭킹"
          description="가장 인기있는 상품 모아보기!"
          moreHref="#"
          items={popularList}
          variant="ranking"
        />
        <AuctionCarouselSection
          title="⚡ 경매 진행 중"
          description="실시간 경매가 진행 중인 상품을 모아봤어요!"
          moreHref="#"
          items={processList}
          variant="live"
        />
        <AuctionCarouselSection
          title="⏳ 경매 진행 예정"
          description="경매가 곧 진행될 거예요!"
          moreHref="#"
          items={scheduledList}
          variant="upcoming"
        />
      </Container>
    </main>
  );
}
