"use client";

import { useEffect } from "react";

import { Info, Calendar } from "lucide-react";

import { CategorySelector } from "@/entities/auction";
import {
  PriceInputSection,
  TagInputSection,
  useItemForm,
  usePriceValidation,
  ImageUploadSection,
  DateTimeModal,
} from "@/features/auction/auction-create";
import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";
import Input from "@/shared/ui/input/input";
import { ScrollArea } from "@/shared/ui/scroll-area/scroll-area";
import { Textarea } from "@/shared/ui/textarea/textarea";

export function AuctionCreateScreen() {
  const form = useItemForm();

  const productName = form.watch("productName");
  const category = form.watch("category");
  const tags = form.watch("tags");
  const description = form.watch("description");

  const priceValidation = usePriceValidation({
    setValue: form.setValue,
    setError: form.setError,
    clearErrors: form.clearErrors,
    getValues: form.getValues,
  });

  const handleSubmit = async () => {
    // TODO: 상품 등록 API 연결
    // const submitData = form.getSubmitData();
    // if (!submitData) {
    //   return;
    // }
    // console.warn("submitData preview:", submitData);
  };

  // Modal 영역 뒷 배경 스크롤 방지
  useEffect(() => {
    if (form.isDateTimeModalOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [form.isDateTimeModalOpen]);

  return (
    <ScrollArea className={cn("bg-background mx-auto min-h-screen w-full max-w-3xl")}>
      <div className="flex min-h-screen flex-col items-center gap-2 p-4">
        <div className="w-full max-w-3xl">
          <p className="mb-6 text-left text-2xl font-bold">판매 물품 등록</p>
          <div className="space-y-6">
            {/* 이미지 업로드 */}
            <ImageUploadSection images={form.images} onImagesChange={form.setImages} />

            {/* 상품명 */}
            <div>
              <label htmlFor="product-name" className="mb-2 block text-sm font-medium">
                상품명
              </label>
              <Input
                id="product-name"
                type="text"
                className="border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 items-center gap-2 rounded-lg border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]"
                placeholder="상품명을 입력해주세요"
                value={productName}
                onChange={(e) => form.setProductName(e.target.value)}
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium">
                카테고리
              </label>
              <CategorySelector
                value={category}
                onValueChange={(value) => form.setCategory(value)}
              />
            </div>

            {/* 태그 */}
            <TagInputSection tags={tags} onTagsChange={form.setTags} />

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
                onChange={(e) => form.setDescription(e.target.value)}
              />
            </div>

            {/* 가격 입력 */}
            <PriceInputSection
              control={form.control}
              startPriceError={form.startPriceError}
              stopLossError={form.stopLossError}
              dropPriceError={form.dropPriceError}
              onStartPriceBlur={priceValidation.handleStartPriceBlur}
              onStopLossPriceBlur={priceValidation.handleStopLossPriceBlur}
              onDropPriceBlur={priceValidation.handleDropPriceBlur}
            />

            {/* 경매 시작 일정 */}
            <div>
              <label htmlFor="reserve-date" className="mb-2 block text-sm font-medium">
                경매 예약 일정
              </label>
              <Button
                type="button"
                onClick={() => form.setIsDateTimeModalOpen(true)}
                variant="outline"
                className="h-10 w-full justify-between font-normal"
              >
                <span className={form.selectedDate ? "text-foreground" : "text-muted-foreground"}>
                  {form.getDisplayText()}
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
                disabled={!form.formValid}
                onClick={handleSubmit}
              >
                경매 예약하기
              </Button>
            </div>
          </div>
        </div>

        {/* 날짜/시간 선택 모달 */}
        {form.isDateTimeModalOpen && (
          <DateTimeModal
            selectedDate={form.selectedDate}
            selectedTime={form.selectedTime}
            onClose={() => form.setIsDateTimeModalOpen(false)}
            onConfirm={form.handleDateTimeConfirm}
          />
        )}
      </div>
    </ScrollArea>
  );
}
