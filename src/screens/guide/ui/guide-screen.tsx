import { AuctionItemCard } from "@/entities/auction";
import { Button, Input } from "@/shared/ui";

export default function GuideScreen() {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <section className="mb-24">
        <b className="text-bold text-brand mb-3 text-base">서비스 가이드</b>
        <h1 className="text-3xl font-bold">
          가격이 내려가는 특별한 경매, <br />
          네덜란드 경매를 시작하세요
        </h1>
      </section>

      <section className="mb-24">
        <p className="mb-3">네덜란드 경매란?</p>
        <p className="text-muted-foreground mb-3">
          시작 가격에서 시간이 지날수록 가격이 점점 낮아지는 역경매 방식입니다.
        </p>
        <div className="mb-3 w-90 rounded-md bg-[#F9FAFB] p-4">
          <p className="text-muted my-4">
            판매자는 <b className="text-brand font-semibold">기준 금액</b>과<br />
            시간 경과에 따른 <b className="text-brand font-semibold">하락 금액</b>을 설정해요
          </p>
          <div className="bg-white pt-4">
            <div className="mt-8 flex items-center gap-3">
              <span className="bg-muted h-px flex-1" />
              <p className="text-muted-foreground">5분</p>
              <span className="border-muted-foreground w-24 border border-dotted" />
            </div>
            <div>
              <div className="mt-4 flex items-center gap-3">
                <span className="bg-brand h-8 w-12 rounded-r-sm" />
                <p className="text-brand">10,000원</p>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-8 w-24 rounded-r-sm bg-[#F4EFFF]" />
                <p className="text-muted">12,000원</p>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-8 w-36 rounded-r-sm bg-[#F4EFFF]" />
                <p className="text-muted">14,000원</p>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-8 w-48 rounded-r-sm bg-[#F4EFFF]" />
                <p className="text-muted">16,000원</p>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-block rounded-md bg-[#F9FAFB] p-4">
          <p className="text-muted my-4">
            시간이 지날수록 가격이 하락하고
            <br />
            구매자는 눈치싸움을 바탕으로
            <br />
            <b className="text-brand font-semibold">원하는 가격에서 빠르게 상품을 확보</b>해요
          </p>
          <div className="flex gap-3">
            <div className="bg-white pt-4">
              <div className="mt-8 flex items-center gap-3">
                <span className="bg-muted h-px flex-1" />
                <p className="text-muted-foreground">5분</p>
                <span className="border-muted-foreground w-24 border border-dotted" />
              </div>
              <div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="bg-brand h-8 w-12 rounded-r-sm" />
                  <p className="text-brand">10,000원</p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-8 w-24 rounded-r-sm bg-[#F4EFFF]" />
                  <p className="text-muted">12,000원</p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-8 w-36 rounded-r-sm bg-[#F4EFFF]" />
                  <p className="text-muted">14,000원</p>
                  <Button>구매하기</Button>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-8 w-48 rounded-r-sm bg-[#F4EFFF]" />
                  <p className="text-muted">16,000원</p>
                </div>
              </div>
            </div>

            <div className="bg-white px-4 pt-4">
              <div className="flex flex-col items-start">
                <div className="border-muted-foreground text-muted rounded-sm border px-2 py-3 text-xs">
                  상품 잘 도착했나요?
                </div>
                <div className="text-muted-foreground text-xs">오전 10:00</div>
              </div>
              <div className="mt-8 flex flex-col items-end">
                <span className="bg-brand rounded-sm border px-2 py-3 text-xs text-white">
                  네 잘 받았습니다. 상품 상태 좋네요!
                </span>
                <div className="text-muted-foreground text-xs">오전 10:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <p className="mb-3 font-semibold">구매자 가이드</p>
        <div className="flex justify-center rounded-md bg-[#F9FAFB] pt-8">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-brand mb-2 text-lg font-semibold">판매 품목</span>
              <span className="text-muted-foreground">현재 판매중인 품목이에요</span>
              <AuctionItemCard
                variant="live"
                auctionId={1}
                imageUrl="https://picsum.photos/seed/auction--2114285778-1/800/800"
                title="아이폰 14 프로 256GB 딥퍼플"
                isLiked={false}
                startPrice={100000}
                startedAt="123"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-brand mb-2 text-lg font-semibold">예정 품목</span>
              <span className="text-muted-foreground">곧 판매가 시작해요!</span>
              <AuctionItemCard
                variant="upcoming"
                auctionId={1}
                imageUrl="https://picsum.photos/seed/auction--2114285778-1/800/800"
                title="아이폰 14 프로 256GB 딥퍼플"
                isLiked={false}
                startPrice={100000}
                startedAt="123"
              />
            </div>
          </div>
        </div>
        <p className="mt-3 font-semibold">상품 탐색</p>
        <span className="text-muted-foreground">
          시간이 지날수록 가격이 하락하고, <br />
          구매자는 원하는 가격에 빠르게 상품을 확보해요
        </span>
      </section>

      <section className="mb-24">
        <p className="mb-3 font-semibold">판매자 가이드</p>
        <div className="flex justify-center rounded-md bg-[#F9FAFB] pt-8">
          <div className="flex w-md flex-col gap-3 pb-8">
            <div>
              <span className="font-semibold text-zinc-900">판매 시작가</span>
              <Input className="bg-muted" placeholder="₩ 0" />
            </div>
            <div>
              <span className="font-semibold text-zinc-900">판매 최저가 (Stop Loss)</span>
              <Input className="bg-muted" placeholder="₩ 시작가의 90% 이하 가격을 설정해주세요" />
            </div>
            <div>
              <span className="font-semibold text-zinc-900">가격 하락 단위 설정</span>
              <Input className="bg-muted" placeholder="₩ 0" />
            </div>
            <div>
              <span className="font-semibold text-zinc-900">경매 시작 일정</span>
              <Input className="bg-muted" placeholder="날짜 및 시간을 선택하세요" type="date" />
            </div>
          </div>
        </div>
        <p className="mt-3 font-semibold">상품 등록</p>
        <span className="text-muted-foreground">
          판매자는 원하는 가격과 시간에 제품을 등록하고, <br />
          경제 진행을 바탕으로 제품을 판매할 수 있어요.
        </span>
      </section>
    </div>
  );
}
