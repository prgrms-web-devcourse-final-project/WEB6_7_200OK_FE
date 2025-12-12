"use client";

import { useState } from "react";

import { ImagePlus, X, AlertCircle, Info, Calendar } from "lucide-react";

import Button from "@/shared/ui/button/button";
import FileInput from "@/shared/ui/input/file-input";
import Input from "@/shared/ui/input/input";
import { DateTimeModal } from "@/shared/ui/modal/date-time-modal";
import { Textarea } from "@/shared/ui/textarea/textarea";

export function AddItemScreen() {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState({ hour: 10, minute: 30, period: "오전" }); // 디폴트 값, 추후 변경 필요
  const [displayText, setDisplayText] = useState("날짜 및 시간을 선택해주세요");

  // 기본 정보
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // 태그
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // 판매 시작가, 최저가, 가격 하락 단위
  const [startPrice, setStartPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [dropPrice, setDropPrice] = useState("");

  // 에러 메시지 관리 (스탑로스, 가격 하락 단위)
  const [startPriceError, setStartPriceError] = useState("");
  const [stopLossError, setStopLossError] = useState("");
  const [dropPriceError, setDropPriceError] = useState("");

  // 스탑로스 가격 검증 (최소 90%)
  const validateStopLossPrice = (start: string, stop: string) => {
    // 시작가가 있는데 최저가가 없는 경우
    if (start && !stop) {
      setStopLossError("최저가를 입력 해주세요.");
      return;
    }

    // 둘 다 없거나 시작가만 없는 경우
    if (!start || !stop) {
      setStopLossError("");
      return;
    }

    const startValue = parseFloat(start);
    const stopValue = parseFloat(stop);

    if (!Number.isNaN(startValue) && !Number.isNaN(stopValue)) {
      if (stopValue > startValue * 0.9) {
        setStopLossError("판매 최저가는 판매 시작가의 90%을 초과할 수 없습니다.");
      } else {
        setStopLossError("");
      }
    }
  };

  // 가격 하락 단위 검증 (최소 0.5%)
  const validateDropPrice = (start: string, drop: string, stopLoss: string) => {
    // 시작가가 있는데 하락 단위가 없는 경우
    if (start && !drop) {
      setDropPriceError("하락 단위를 입력 해주세요.");
      return;
    }

    // 둘 다 없거나 시작가만 없는 경우
    if (!start || !drop) {
      setDropPriceError("");
      return;
    }

    const startValue = parseFloat(start);
    const dropValue = parseFloat(drop);
    const stopLossValue = stopLoss ? parseFloat(stopLoss) : 0;

    if (!Number.isNaN(startValue) && !Number.isNaN(dropValue)) {
      if (dropValue >= startValue) {
        setDropPriceError("가격 하락 단위는 판매 시작가보다 같거나 높을 수 없습니다.");
      } else if (
        // 가격 하락 단위가 큰 경우 (시작가 1000, 최저가 900, 가격 하락 단위 100 이상일 경우 발생)
        stopLoss &&
        !Number.isNaN(stopLossValue) &&
        dropValue > startValue - stopLossValue
      ) {
        setDropPriceError(
          "가격 하락 단위가 너무 큽니다. 단위는 (판매 시작가 - 판매 최저가)보다 작아야 합니다."
        );
      } else if (dropValue < startValue * 0.005) {
        setDropPriceError("가격 하락 단위는 판매 시작가의 0.5% 미만 일 수 없습니다.");
      } else {
        setDropPriceError(""); // 모든 조건이 OK일 때만 초기화
      }
    }
  };

  const handleStartPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStartPrice(value);

    if (value) {
      const price = parseFloat(value);

      // 판매 시작가 최소값 1000 설정
      if (price < 1000) {
        setStartPriceError("판매 시작가는 1000원 이상 설정해주세요.");
      } else {
        setStartPriceError("");
      }

      if (!Number.isNaN(price)) {
        // 스탑로스 자동 계산
        const calculatedStopLoss = Math.floor(price * 0.9).toString();
        setStopLossPrice(calculatedStopLoss);
        validateStopLossPrice(value, calculatedStopLoss);

        // 가격 하락 단위 자동 계산
        const calculatedDropPrice = Math.floor(price * 0.01).toString();
        setDropPrice(calculatedDropPrice);
        validateDropPrice(value, calculatedDropPrice, calculatedStopLoss);
      }
    } else {
      setStopLossPrice("");
      setDropPrice("");
      setStartPriceError("");
      setStopLossError("");
      setDropPriceError("");
    }
  };

  const handleStopLossPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStopLossPrice(value);
    validateStopLossPrice(startPrice, value);
    // 최저가 변경 시 가격 하락 단위도 재검증
    validateDropPrice(startPrice, dropPrice, value);
  };

  const handleDropPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDropPrice(value);
    validateDropPrice(startPrice, value, stopLossPrice);
  };

  const handleAddTag = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  const formatDateTime = (date: Date, time: { hour: number; minute: number; period: string }) =>
    `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${time.period} ${time.hour}:${String(time.minute).padStart(2, "0")}`;

  const handleDateTimeConfirm = (
    date: Date,
    time: { hour: number; minute: number; period: string }
  ) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setDisplayText(formatDateTime(date, time));
    setIsDateModalOpen(false);
  };

  // 모든 필수 필드가 채워졌는지 확인
  const isFormValid = () => {
    const hasBasicInfo = productName.trim() !== "" && category !== "" && description.trim() !== "";
    const hasPriceInfo = startPrice !== "" && stopLossPrice !== "" && dropPrice !== "";
    const hasSchedule = selectedDate !== null;
    const hasNoErrors = startPriceError === "" && stopLossError === "" && dropPriceError === "";

    return hasBasicInfo && hasPriceInfo && hasSchedule && hasNoErrors;
  };

  return (
    <div className="mx-auto min-h-screen max-w-full gap-2 p-4 py-8">
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
          <Input
            id="product-name"
            placeholder="상품명을 입력해주세요"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            카테고리
          </label>
          <div className="relative">
            <select
              id="category"
              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 bg-background text-foreground [&>option]:bg-background [&>option]:text-foreground dark:bg-card dark:[&>option]:bg-card h-10 w-full appearance-none rounded-md border px-3 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled className="text-muted-foreground">
                카테고리를 선택해주세요
              </option>
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
          <Input
            id="tags"
            placeholder="태그를 입력해주세요."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
          />
          {tags.length > 0 && (
            <div className="mt-2 flex min-h-10 w-full flex-wrap items-center gap-2 rounded-md bg-transparent py-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent text-accent-foreground flex items-center gap-1 rounded-md px-2 py-1 text-sm"
                >
                  # {tag}
                  <Button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    variant="ghost"
                    size="icon-sm"
                    className="h-auto w-auto p-0 hover:bg-transparent hover:opacity-70"
                    aria-label={`${tag} 태그 삭제`}
                  >
                    <X className="size-3" />
                  </Button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 상세 정보 */}
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            상세 정보
          </label>
          <Textarea
            id="description"
            placeholder="상품에 대한 상세한 설명을 입력해주세요."
            className="min-h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 판매 시작가 */}
        <div>
          <label htmlFor="start-price" className="mb-2 block text-sm font-medium">
            판매 시작가
          </label>
          <div className="border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex h-10 items-center gap-2 rounded-md border bg-transparent px-3 shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]">
            <span className="text-muted-foreground shrink-0">₩</span>
            <Input
              id="start-price"
              type="number"
              placeholder="0"
              value={startPrice}
              onChange={handleStartPriceChange}
              className="h-full flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </div>
          {startPriceError && <p className="text-destructive mt-1 text-xs">{startPriceError}</p>}
        </div>

        {/* 판매 최저가 (Stop Loss) */}
        <div>
          <label htmlFor="stop-loss-price" className="mb-2 block text-sm font-medium">
            판매 최저가 (Stop Loss)
          </label>
          <div className="border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex h-10 items-center gap-2 rounded-md border bg-transparent px-3 shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]">
            <span className="text-muted-foreground shrink-0">₩</span>
            <Input
              id="stop-loss-price"
              type="number"
              placeholder="시작가의 90% 이하 가격을 설정해주세요."
              value={stopLossPrice}
              onChange={handleStopLossPriceChange}
              className="h-full flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </div>
          {stopLossError && <p className="text-destructive mt-1 text-xs">{stopLossError}</p>}
          {/* 경고 메시지 */}
          <div className="border-info-bg/70 bg-info-bg/30 mt-2 flex items-center gap-2 rounded-md border p-3">
            <AlertCircle className="text-info-text size-4 shrink-0" />
            <p className="text-info-text text-xs">
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
          <div className="border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex h-10 items-center gap-2 rounded-md border bg-transparent px-3 shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]">
            <span className="text-muted-foreground shrink-0">₩</span>
            <Input
              id="drop-price"
              type="number"
              placeholder="시작가의 0.5% 이상 가격을 설정해주세요."
              value={dropPrice}
              onChange={handleDropPriceChange}
              className="h-full flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </div>
          {dropPriceError && <p className="text-destructive mt-1 text-xs">{dropPriceError}</p>}
          {/* 경고 메시지 */}
          <div className="border-info-bg/70 bg-info-bg/30 mt-2 flex items-center gap-2 rounded-md border p-3">
            <AlertCircle className="text-info-text size-4 shrink-0" />
            <p className="text-info-text text-xs">
              5분마다 설정된 가격이 자동으로 하락합니다. 최소 가격은 시작 가격의 0.5%입니다.
            </p>
          </div>
        </div>

        {/* 경매 시작 일정 */}
        <div>
          <label htmlFor="reserve-date" className="mb-2 block text-sm font-medium">
            경매 예약 일정
          </label>
          <Button
            type="button"
            onClick={() => setIsDateModalOpen(true)}
            variant="outline"
            className="h-10 w-full justify-between font-normal"
          >
            <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
              {displayText}
            </span>
            <Calendar className="text-muted-foreground size-4" />
          </Button>
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
          <Button id="reserve-button" className="flex-1" disabled={!isFormValid()}>
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
          onConfirm={handleDateTimeConfirm}
        />
      )}
    </div>
  );
}
