"use client";

import { useState } from "react";

import { ImagePlus, X, AlertCircle, Info, Calendar } from "lucide-react";
import { z } from "zod";

import Button from "@/shared/ui/button/button";
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

import {
  DEFAULT_DROP_PERCENTAGE,
  MAX_TAGS,
  MIN_DROP_PERCENTAGE,
  MIN_START_PRICE,
  STOP_LOSS_PERCENTAGE,
} from "../lib/constants";

// 필드 검증용
const startPriceSchema = z
  .number()
  .min(MIN_START_PRICE, `판매 시작가는 ${MIN_START_PRICE.toLocaleString()}원 이상 설정해주세요.`);

const stopLossPriceSchema = z.number().positive("최저가를 입력 해주세요.");
const dropPriceSchema = z.number().positive("하락단위를 입력 해주세요.");

export function AddItemScreen() {
  const [selectedDate] = useState<Date | null>(null);
  const [displayText] = useState<string>("날짜 및 시간을 선택해주세요");

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

  // 스탑로스 가격 검증 (최소 90%)
  const validateStopLossPrice = (start: number | null, stop: number | null) => {
    if (start && !stop) {
      setStopLossError("최저가를 입력 해주세요.");
      return;
    }

    if (!start || !stop) {
      setStopLossError("");
      return;
    }

    const stopLossResult = stopLossPriceSchema.safeParse(stop);
    if (!stopLossResult.success) {
      setStopLossError(stopLossResult.error.issues[0]?.message || "");
      return;
    }

    if (stop > start * STOP_LOSS_PERCENTAGE) {
      setStopLossError("판매 최저가는 판매 시작가의 90%를 초과할 수 없습니다.");
    } else {
      setStopLossError("");
    }
  };

  // 가격 하락 단위 검증 (최소 0.5%)
  const validateDropPrice = (
    start: number | null,
    drop: number | null,
    stopLoss: number | null
  ) => {
    if (start && !drop) {
      setDropPriceError("하락단위를 입력 해주세요.");
      return;
    }

    if (!start || !drop) {
      setDropPriceError("");
      return;
    }

    const dropPriceResult = dropPriceSchema.safeParse(drop);
    if (!dropPriceResult.success) {
      setDropPriceError(dropPriceResult.error.issues[0]?.message || "");
      return;
    }

    if (drop >= start) {
      setDropPriceError("가격 하락 단위는 판매 시작가보다 같거나 높을 수 없습니다.");
    } else if (stopLoss && drop > start - stopLoss) {
      setDropPriceError(
        "가격 하락 단위가 너무 큽니다. 단위는 (판매 시작가 - 판매 최저가)보다 작아야 합니다."
      );
    } else if (drop < start * MIN_DROP_PERCENTAGE) {
      setDropPriceError("가격 하락 단위는 판매 시작가의 0.5% 미만 일 수 없습니다.");
    } else {
      setDropPriceError("");
    }
  };

  const handleStartPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      setStartPrice(null);
      return;
    }

    const price = Number(value);
    if (Number.isNaN(price)) return;

    setStartPrice(price);
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
    validateStopLossPrice(startPrice, calculatedStopLoss);

    // 가격 하락 단위 자동 계산 (시작가의 1%)
    const calculatedDropPrice = Math.floor(startPrice * DEFAULT_DROP_PERCENTAGE);
    setDropPrice(calculatedDropPrice);
    validateDropPrice(startPrice, calculatedDropPrice, calculatedStopLoss);
  };

  const handleStopLossPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      setStopLossPrice(null);
      return;
    }

    const numValue = Number(value);
    if (Number.isNaN(numValue)) return;

    setStopLossPrice(numValue);
  };

  const handleStopLossPriceBlur = () => {
    if (!stopLossPrice) {
      setStopLossError("");
      return;
    }

    validateStopLossPrice(startPrice, stopLossPrice);
    // 최저가 변경 시 가격 하락 단위도 재검증
    validateDropPrice(startPrice, dropPrice, stopLossPrice);
  };

  const handleDropPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      setDropPrice(null);
      return;
    }

    const numValue = Number(value);
    if (Number.isNaN(numValue)) return;

    setDropPrice(numValue);
  };

  const handleDropPriceBlur = () => {
    if (!dropPrice) {
      setDropPriceError("");
      return;
    }

    validateDropPrice(startPrice, dropPrice, stopLossPrice);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  // 모든 필수 필드가 채워졌는지 확인 (경매 예약하기 버튼 활성화 여부)
  const isFormValid = () => {
    const hasBasicInfo = productName.trim() !== "" && category !== "" && description.trim() !== "";
    const hasPriceInfo = startPrice !== null && stopLossPrice !== null && dropPrice !== null;
    const hasSchedule = selectedDate !== null;
    const hasNoErrors = startPriceError === "" && stopLossError === "" && dropPriceError === "";

    return hasBasicInfo && hasPriceInfo && hasSchedule && hasNoErrors;
  };

  return (
    <ScrollArea className="mx-auto min-h-screen max-w-full gap-2 p-4 py-6">
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
                <SelectItem value="clothing">의류</SelectItem>
                <SelectItem value="accessories">잡화</SelectItem>
                <SelectItem value="furniture">가구/인테리어</SelectItem>
                <SelectItem value="digital">디지털</SelectItem>
                <SelectItem value="appliances">가전제품</SelectItem>
                <SelectItem value="sports">스포츠/레저</SelectItem>
                <SelectItem value="pet">반려동물</SelectItem>
                <SelectItem value="hobby">취미</SelectItem>
                <SelectItem value="books">도서/티켓</SelectItem>
                <SelectItem value="etc">기타</SelectItem>
              </SelectContent>
            </Select>
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
            태그 ({tags.length}/{MAX_TAGS})
          </label>
          <Input
            id="tags"
            type="text"
            placeholder={tags.length <= MAX_TAGS ? "태그를 입력해주세요." : undefined}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            disabled={tags.length >= MAX_TAGS}
            className={tags.length >= MAX_TAGS ? "select-none" : ""}
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
              onChange={handleStartPriceChange}
              onBlur={handleStartPriceBlur}
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
          <div className="border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 items-center gap-2 rounded-lg border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
            <span className="text-muted-foreground shrink-0">₩</span>
            <Input
              id="stop-loss-price"
              type="number"
              placeholder="시작가의 90% 이하 가격을 설정해주세요."
              value={stopLossPrice ?? ""}
              onChange={handleStopLossPriceChange}
              onBlur={handleStopLossPriceBlur}
              className="h-full flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </div>
          {stopLossError && <p className="text-destructive mt-1 text-xs">{stopLossError}</p>}
          {/* 경고 메시지 */}
          <div className="border-info-bg/70 bg-info-bg/30 mt-2 flex items-center gap-2 rounded-lg border p-3">
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
          <div className="border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 items-center gap-2 rounded-lg border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
            <span className="text-muted-foreground shrink-0">₩</span>
            <Input
              id="drop-price"
              type="number"
              placeholder="시작가의 0.5% 이상 가격을 설정해주세요."
              value={dropPrice ?? ""}
              onChange={handleDropPriceChange}
              onBlur={handleDropPriceBlur}
              className="h-full flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </div>
          {dropPriceError && <p className="text-destructive mt-1 text-xs">{dropPriceError}</p>}
          {/* 경고 메시지 */}
          <div className="border-info-bg/70 bg-info-bg/30 mt-2 flex items-center gap-2 rounded-lg border p-3">
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
            // onClick={() => setIsDateModalOpen(true)}
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
    </ScrollArea>
  );
}
