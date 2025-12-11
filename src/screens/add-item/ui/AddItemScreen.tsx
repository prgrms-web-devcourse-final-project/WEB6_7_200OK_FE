"use client";

import { useState } from "react";

import { ImagePlus, X, AlertCircle, Info, Calendar } from "lucide-react";

import Button from "@/shared/ui/button/button";
import FileInput from "@/shared/ui/input/file-input";
import Input from "@/shared/ui/input/input";
import { DateTimeModal } from "@/shared/ui/modal/date-time-modal";

export function AddItemScreen() {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState({ hour: 10, minute: 30, period: "오전" });
  const [displayText, setDisplayText] = useState("날짜 및 시간을 선택해주세요");
  return (
    <div className="mx-auto min-h-screen max-w-2xl gap-2 p-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">판매 물품 등록</h1>

      <div className="space-y-6">
        {/* 이미지 업로드 */}
        <div>
          <FileInput Icon={ImagePlus} value="이미지" placeholder="이미지를 선택하세요" />
        </div>

        {/* 상품명 */}
        <div>
          <label htmlFor="product-name" className="mb-2 block text-sm font-medium">
            상품명
          </label>
          <Input id="product-name" placeholder="상품명을 입력해주세요" />
        </div>

        {/* 카테고리 */}
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            카테고리
          </label>
          <div className="relative">
            <select
              id="category"
              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-10 w-full appearance-none rounded-md border bg-transparent px-3 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
              defaultValue=""
            >
              <option value="" disabled>
                카테고리를 선택해주세요
              </option>
              <option value="all">전체</option>
              <option value="clothing">의류</option>
              <option value="accessories">잡화</option>
              <option value="furniture">가구/인테리어</option>
              <option value="digital">디지털</option>
              <option value="appliances">가전제품</option>
              <option value="sports">스포츠/레저</option>
              <option value="pet">반려동물</option>
              <option value="hobby">취미</option>
              <option value="books">도서/티켓</option>
              <option value="etc">기타</option>
            </select>
            <svg
              className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* 태그 */}
        <div>
          <label htmlFor="tags" className="mb-2 block text-sm font-medium">
            태그
          </label>
          <Input id="tags" placeholder="태그를 입력해주세요" />
          <div
            id="tags"
            className="flex min-h-10 w-full flex-wrap items-center gap-2 rounded-md bg-transparent px-3 py-2"
          >
            {/* 예시 태그들 */}
            <span className="bg-accent text-accent-foreground flex items-center gap-1 rounded-md px-2 py-1 text-sm">
              #아이패드
              <button type="button" className="hover:opacity-70">
                <X className="size-3" />
              </button>
            </span>
            <span className="bg-accent text-accent-foreground flex items-center gap-1 rounded-md px-2 py-1 text-sm">
              #아이폰
              <button type="button" className="hover:opacity-70">
                <X className="size-3" />
              </button>
            </span>
            <span className="bg-accent text-accent-foreground flex items-center gap-1 rounded-md px-2 py-1 text-sm">
              #애플
              <button type="button" className="hover:opacity-70">
                <X className="size-3" />
              </button>
            </span>
          </div>
        </div>

        {/* 상세 설명 */}
        <div>
          <label htmlFor="description" className="mb-2 h-[140px] text-sm font-medium">
            상세 설명
          </label>
          {/* <Textarea
            id="description"
            placeholder="상품에 대한 상세한 설명을 입력해주세요."
            className="min-h-32"
          /> */}
        </div>

        {/* 판매 시작가 */}
        <div>
          <label htmlFor="start-price" className="mb-2 block text-sm font-medium">
            판매 시작가
          </label>
          <div className="relative">
            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              ₩
            </span>
            <Input id="start-price" type="number" placeholder="0" className="pl-7" />
          </div>
        </div>

        {/* 판매 최저가 (Shop Loss) */}
        <div>
          <label htmlFor="stop-loss-price" className="mb-2 block text-sm font-medium">
            판매 최저가 (Shop Loss)
          </label>
          <div className="relative">
            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              ₩
            </span>
            <Input
              id="stop-loss-price"
              type="number"
              placeholder="시작가의 90% 이하 가격을 설정해주세요."
              className="pl-7"
            />
          </div>
          {/* 경고 메시지 */}
          <div className="mt-2 flex gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/20">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-500" />
            <p className="text-xs text-amber-800 dark:text-amber-300">
              최저가는 판매자만 볼 수 있으며, 이 가격까지 판매되지 않으면 경매가 자동으로
              종료됩니다.
            </p>
          </div>
        </div>

        {/* 가격 하락 단위 */}
        <div>
          <label htmlFor="drop-price" className="mb-2 block text-sm font-medium">
            가격 하락 단위
          </label>
          <div className="relative">
            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              ₩
            </span>
            <Input id="drop-price" type="number" placeholder="1%" className="pl-7" />
          </div>
          {/* 경고 메시지 */}
          <div className="mt-2 flex gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/20">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-500" />
            <p className="text-xs text-amber-800 dark:text-amber-300">
              5분마다 설정된 가격이 자동으로 하락합니다. 최소 가격은 시작 가격의 0.5%입니다.
            </p>
          </div>
        </div>

        {/* 경매 시작 일정 */}
        <div>
          <label htmlFor="reserve-date" className="mb-2 block text-sm font-medium">
            경매 예약 일정
          </label>
          <button
            type="button"
            onClick={() => setIsDateModalOpen(true)}
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex h-10 w-full items-center justify-between rounded-md border bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:text-base"
          >
            <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
              {displayText}
            </span>
            <Calendar className="text-muted-foreground size-4" />
          </button>
        </div>

        {/* 네덜란드 경매란? */}
        <div className="rounded-lg border bg-[#eff6ff] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Info className="size-5 text-[#1c449d]" />
            <p className="text-base font-semibold text-[#1c449d]">네덜란드 경매란?</p>
          </div>
          <div className="space-y-2 text-sm text-[#1c449d]">
            <p>• 높은 가격에서 시작하여 시간이 지날수록 자동으로 가격이 하락합니다.</p>
            <p>• 구매자는 원하는 가격에 도달했을 때 즉시 구매할 수 있습니다.</p>
            <p>• Stop Loss 가격에 도달하면 5분 후 자동 종료됩니다.</p>
            <p>• 빠른 판매가 가능하며, 실시간으로 많은 구매자들이 주목합니다.</p>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-3 pt-4">
          <Button id="cancel-button" variant="outline" className="flex-1">
            취소
          </Button>
          <Button id="reserve-button" className="flex-1">
            경매 예약하기
          </Button>
        </div>
      </div>

      {/* 날짜/시간 선택 모달 */}
      {isDateModalOpen && (
        <DateTimeModal
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onClose={() => setIsDateModalOpen(false)}
          onConfirm={(date, time) => {
            setSelectedDate(date);
            setSelectedTime(time);
            const formatted = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${time.period} ${time.hour}:${String(time.minute).padStart(2, "0")}`;
            setDisplayText(formatted);
            setIsDateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
