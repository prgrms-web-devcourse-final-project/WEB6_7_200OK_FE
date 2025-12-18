"use client";

import { useMemo, useState } from "react";

import { ImagePlus, X, Info, Calendar } from "lucide-react";

import { formatDateTimeDisplay, type TimeSelection } from "@/entities/date-modal";
import { CATEGORY_LABEL, ITEM_CATEGORIES } from "@/entities/item/model/category";
import {
  DEFAULT_DROP_PERCENTAGE,
  MAX_TAGS,
  STOP_LOSS_PERCENTAGE,
} from "@/entities/item/model/registration-constants";
import {
  isFormValid,
  startPriceSchema,
  validateDropPrice,
  validateStopLossPrice,
} from "@/shared/lib/utils/validator/validators";
import Button from "@/shared/ui/button/button";
import { InfoAlert } from "@/shared/ui/info-alert/info-alert";
import FileInput from "@/shared/ui/input/file-input";
import Input from "@/shared/ui/input/input";
import { ScrollArea } from "@/shared/ui/scroll-area/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { Textarea } from "@/shared/ui/textarea/textarea";
import { DateTimeModal } from "@/widgets/new-item-modal/index";

export function NewItemScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSelection | null>(null);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState<boolean>(false);

  // 기본 정보
  const [productName, setProductName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // 태그
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  // 판매 시작가, 최저가, 가격 하락 단위
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const [stopLossPrice, setStopLossPrice] = useState<number | null>(null);
  const [dropPrice, setDropPrice] = useState<number | null>(null);

  // 에러 메시지 관리 (스탑로스, 가격 하락 단위)
  const [startPriceError, setStartPriceError] = useState<string>("");
  const [stopLossError, setStopLossError] = useState<string>("");
  const [dropPriceError, setDropPriceError] = useState<string>("");

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number | null) => void
  ) => {
    const { value } = e.target;

    if (!value) {
      setter(null);
      return;
    }

    const numValue = Number(value);
    if (Number.isNaN(numValue)) return;

    setter(numValue);
  };

  const handleStartPriceBlur = () => {
    if (!startPrice) {
      setStopLossPrice(null);
      setDropPrice(null);
      setStartPriceError("");
      setStopLossError("");
      setDropPriceError("");
      return;
    }

    // 시작가 검증
    const startPriceResult = startPriceSchema.safeParse(startPrice);
    if (!startPriceResult.success) {
      setStartPriceError(startPriceResult.error.issues[0]?.message || "");
      return;
    }
    setStartPriceError("");

    // 스탑로스 자동 계산 (시작가의 90%)
    const calculatedStopLoss = Math.floor(startPrice * STOP_LOSS_PERCENTAGE);
    setStopLossPrice(calculatedStopLoss);
    validateStopLossPrice(startPrice, calculatedStopLoss, setStopLossError);

    // 가격 하락 단위 자동 계산 (시작가의 1%)
    const calculatedDropPrice = Math.floor(startPrice * DEFAULT_DROP_PERCENTAGE);
    setDropPrice(calculatedDropPrice);
    validateDropPrice(startPrice, calculatedDropPrice, calculatedStopLoss, setDropPriceError);
  };

  const handleStopLossPriceBlur = () => {
    if (!stopLossPrice) {
      setStopLossError("");
      return;
    }

    validateStopLossPrice(startPrice, stopLossPrice, setStopLossError);
    // 최저가 변경 시 가격 하락 단위도 재검증
    validateDropPrice(startPrice, dropPrice, stopLossPrice, setDropPriceError);
  };

  const handleDropPriceBlur = () => {
    if (!dropPrice) {
      setDropPriceError("");
      return;
    }

    validateDropPrice(startPrice, dropPrice, stopLossPrice, setDropPriceError);
  };

  const handleDateTimeConfirm = (date: Date, time: TimeSelection) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsDateTimeModalOpen(false);
  };

  const getDisplayText = (): string => {
    if (!selectedDate) {
      return "날짜 및 시간을 선택해주세요";
    }
    return formatDateTimeDisplay(selectedDate, selectedTime);
  };

  const handleSubmit = async () => {
    if (!formValid || !selectedDate || !selectedTime) {
      return;
    }

    const auctionStartDate: Date = selectedDate;

    const submitData = {
      productName,
      category,
      description,
      tags,
      startPrice: startPrice!,
      stopLossPrice: stopLossPrice!,
      dropPrice: dropPrice!,
      auctionStartDate,
    } as Record<string, string | number | string[] | Date>;

    console.warn("submitData preview:", submitData);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    let value = inputValue;

    // 한글, 영어, 숫자만 허용
    value = value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g, "");

    setTagInput(value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      if (tags.length >= MAX_TAGS) {
        return;
      }

      const trimmedValue = tagInput.trim();

      // 이미 존재하는 값일 시, 값이 없을 경우 무시
      if (!trimmedValue || tags.includes(trimmedValue)) {
        return;
      }

      setTags((prevTags) => [...prevTags, trimmedValue]);
      setTagInput("");
    }
  };

  // 모든 폼 데이터 검증 (태그 제외)
  const formValid = useMemo(
    () =>
      isFormValid({
        productName,
        category,
        description,
        startPrice,
        stopLossPrice,
        dropPrice,
        selectedDate,
        startPriceError,
        stopLossError,
        dropPriceError,
      }),
    [
      productName,
      category,
      description,
      startPrice,
      stopLossPrice,
      dropPrice,
      selectedDate,
      startPriceError,
      stopLossError,
      dropPriceError,
    ]
  );

  return (
    <ScrollArea className="bg-background mx-auto min-h-screen w-full max-w-3xl">
      <div className="flex min-h-screen flex-col items-center gap-2 p-4">
        <div className="w-full max-w-3xl">
          <p className="mb-6 text-left text-2xl font-bold">판매 물품 등록</p>
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
                type="text"
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
                <Select value={category} onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="h-10 w-full rounded-lg border bg-transparent px-3">
                    <SelectValue placeholder="카테고리를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEM_CATEGORIES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {CATEGORY_LABEL[item]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 태그 */}
            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-medium">
                태그 ({tags.length}/{MAX_TAGS})
              </label>
              <Input
                id="tags"
                type="text"
                placeholder={tags.length <= MAX_TAGS ? "태그를 입력해주세요." : undefined}
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                disabled={tags.length >= MAX_TAGS}
                className={tags.length >= MAX_TAGS ? "select-none" : ""}
                maxLength={10}
              />
              {tags.length > 0 && (
                <div className="mt-2 flex min-h-10 w-full flex-wrap items-center gap-2 rounded-lg bg-transparent py-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-accent text-accent-foreground flex items-center gap-1 rounded-lg px-2 py-1 text-sm"
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
                className="min-h-34 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* 판매 시작가 */}
            <div>
              <label htmlFor="start-price" className="mb-2 block text-sm font-medium">
                판매 시작가
              </label>
              <div className="border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 items-center gap-2 rounded-lg border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
                <span className="text-muted-foreground shrink-0">₩</span>
                <Input
                  id="start-price"
                  type="number"
                  placeholder="0"
                  value={startPrice ?? ""}
                  onChange={(e) => handlePriceChange(e, setStartPrice)}
                  onBlur={handleStartPriceBlur}
                  className="h-full flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
                />
              </div>
              {startPriceError && (
                <p className="text-destructive mt-1 text-xs">{startPriceError}</p>
              )}
            </div>

            {/* 판매 최저가 (Stop Loss) */}
            <div>
              <label htmlFor="stop-loss-price" className="mb-2 block text-sm font-medium">
                판매 최저가 (Stop Loss)
              </label>
              <div className="border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 items-center gap-2 rounded-lg border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
                <span className="text-muted-foreground shrink-0">₩</span>
                <Input
                  id="stop-loss-price"
                  type="number"
                  placeholder="시작가의 90% 이하 가격을 설정해주세요."
                  value={stopLossPrice ?? ""}
                  onChange={(e) => handlePriceChange(e, setStopLossPrice)}
                  onBlur={handleStopLossPriceBlur}
                  className="h-full flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
                />
              </div>
              {stopLossError && <p className="text-destructive mt-1 text-xs">{stopLossError}</p>}
              <InfoAlert
                message="최저가는 판매자만 볼 수 있으며, 이 가격까지 판매되지 않으면 경매가 자동으로 종료됩니다."
                className="mt-2"
              />
            </div>

            {/* 가격 하락 단위 */}
            <div>
              <label htmlFor="drop-price" className="mb-2 block text-sm font-medium">
                가격 하락 단위
              </label>
              <div className="border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 items-center gap-2 rounded-lg border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
                <span className="text-muted-foreground shrink-0">₩</span>
                <Input
                  id="drop-price"
                  type="number"
                  placeholder="시작가의 0.5% 이상 가격을 설정해주세요."
                  value={dropPrice ?? ""}
                  onChange={(e) => handlePriceChange(e, setDropPrice)}
                  onBlur={handleDropPriceBlur}
                  className="h-full flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
                />
              </div>
              {dropPriceError && <p className="text-destructive mt-1 text-xs">{dropPriceError}</p>}
              <InfoAlert
                message="5분마다 설정된 가격이 자동으로 하락합니다. 최소 가격은 시작 가격의 0.5%입니다."
                className="mt-2"
              />
            </div>

            {/* 경매 시작 일정 */}
            <div>
              <label htmlFor="reserve-date" className="mb-2 block text-sm font-medium">
                경매 예약 일정
              </label>
              <Button
                type="button"
                onClick={() => setIsDateTimeModalOpen(true)}
                variant="outline"
                className="h-10 w-full justify-between font-normal"
              >
                <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
                  {getDisplayText()}
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
              <Button
                id="reserve-button"
                className="flex-1"
                disabled={!formValid}
                onClick={handleSubmit}
              >
                경매 예약하기
              </Button>
            </div>
          </div>
        </div>

        {/* 날짜/시간 선택 모달 */}
        {isDateTimeModalOpen && (
          <DateTimeModal
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onClose={() => setIsDateTimeModalOpen(false)}
            onConfirm={handleDateTimeConfirm}
          />
        )}
      </div>
    </ScrollArea>
  );
}
