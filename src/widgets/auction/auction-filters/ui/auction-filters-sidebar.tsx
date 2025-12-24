import { Button, Input, RadioGroup, RadioGroupItem, Separator } from "@/shared/ui";

export function AuctionFiltersSidebar() {
  return (
    <aside className="bg-card flex h-fit w-62.5 flex-col items-center gap-4 rounded-xl border p-4">
      <div className="flex w-full items-center justify-between">
        <h2>필터</h2>
        <Button variant="ghost" className="text-muted-foreground w-fit px-2 text-sm">
          초기화
        </Button>
      </div>

      <Separator />

      <div className="flex w-full flex-col gap-4">
        <h3 className="text-sm font-semibold">가격</h3>
        <RadioGroup defaultValue="all" className="gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="all" id="price-all" />
            <label htmlFor="price-all" className="cursor-pointer text-sm">
              전체
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="0-10000" id="price-0-10000" />
            <label htmlFor="price-0-10000" className="cursor-pointer text-sm">
              10,000원 이하
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="10000-50000" id="price-10000-50000" />
            <label htmlFor="price-10000-50000" className="cursor-pointer text-sm">
              10,000원 ~ 50,000원
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="50000-100000" id="price-50000-100000" />
            <label htmlFor="price-50000-100000" className="cursor-pointer text-sm">
              50,000원 ~ 100,000원
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="100000-500000" id="price-100000-500000" />
            <label htmlFor="price-100000-500000" className="cursor-pointer text-sm">
              100,000원 ~ 500,000원
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="500000-1000000" id="price-500000-1000000" />
            <label htmlFor="price-500000-1000000" className="cursor-pointer text-sm">
              500,000원 ~ 1,000,000원
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="1000000+" id="price-1000000" />
            <label htmlFor="price-1000000" className="cursor-pointer text-sm">
              1,000,000원 이상
            </label>
          </div>
        </RadioGroup>

        <div className="text-muted-foreground flex w-full flex-col gap-4 text-xs">
          <div className="flex w-full items-center gap-1">
            <Input className="text-xs" placeholder="100" />
            <span className="shrink-0">원 ~</span>
            <Input className="text-xs" placeholder="100000" />
            <span className="shrink-0">원</span>
          </div>

          <Button variant="primary">검색</Button>
        </div>
      </div>

      <Separator />

      {/* TODO: 태그 섹션 공통으로 빠지면 추가 */}
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-sm font-semibold">태그</h3>
      </div>

      <Separator />

      <div className="flex w-full flex-col gap-4">
        <h3 className="text-sm font-semibold">경매 상태</h3>
        <RadioGroup defaultValue="all-status" className="gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="all-status" id="status-all" />
            <label htmlFor="status-all" className="cursor-pointer text-sm">
              전체
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="in-progress" id="status-in-progress" />
            <label htmlFor="status-in-progress" className="cursor-pointer text-sm">
              진행 중
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="scheduled" id="status-scheduled" />
            <label htmlFor="status-scheduled" className="cursor-pointer text-sm">
              예정
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="ended" id="status-ended" />
            <label htmlFor="status-ended" className="cursor-pointer text-sm">
              종료
            </label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="flex w-full flex-col gap-4">
        <h3 className="text-sm font-semibold">카테고리</h3>

        <RadioGroup defaultValue="all-category" className="gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="all-category" id="category-all" />
            <label htmlFor="category-all" className="cursor-pointer text-sm">
              전체
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="clothing" id="category-clothing" />
            <label htmlFor="category-clothing" className="cursor-pointer text-sm">
              의류
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="accessories" id="category-accessories" />
            <label htmlFor="category-accessories" className="cursor-pointer text-sm">
              잡화
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="furniture" id="category-furniture" />
            <label htmlFor="category-furniture" className="cursor-pointer text-sm">
              가구/인테리어
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="digital" id="category-digital" />
            <label htmlFor="category-digital" className="cursor-pointer text-sm">
              디지털
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="appliances" id="category-appliances" />
            <label htmlFor="category-appliances" className="cursor-pointer text-sm">
              가전제품
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="sports" id="category-sports" />
            <label htmlFor="category-sports" className="cursor-pointer text-sm">
              스포츠/레저
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="pets" id="category-pets" />
            <label htmlFor="category-pets" className="cursor-pointer text-sm">
              반려동물
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="hobbies" id="category-hobbies" />
            <label htmlFor="category-hobbies" className="cursor-pointer text-sm">
              취미
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="books" id="category-books" />
            <label htmlFor="category-books" className="cursor-pointer text-sm">
              도서/티켓
            </label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="etc" id="category-etc" />
            <label htmlFor="category-etc" className="cursor-pointer text-sm">
              기타
            </label>
          </div>
        </RadioGroup>
      </div>
    </aside>
  );
}
