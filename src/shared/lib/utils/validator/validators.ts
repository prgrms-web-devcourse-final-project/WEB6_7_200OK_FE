import { z } from "zod";

import { MIN_DROP_PERCENTAGE, MIN_START_PRICE, STOP_LOSS_PERCENTAGE } from "@/entities/auction";

// 개별 필드 검증용
export const startPriceSchema = z
  .number()
  .min(MIN_START_PRICE, `판매 시작가는 ${MIN_START_PRICE.toLocaleString()}원 이상 설정해주세요.`);

export const stopLossPriceSchema = z.number().positive("최저가를 입력 해주세요.");
export const dropPriceSchema = z.number().positive("하락단위를 입력 해주세요.");

// 폼 유효성 검증 타입
export interface FormValidationParams {
  productName: string;
  category: string;
  description: string;
  startPrice: number | null;
  stopLossPrice: number | null;
  dropPrice: number | null;
  selectedDate: Date | null;
  startPriceError: string;
  stopLossError: string;
  dropPriceError: string;
}

// 스탑로스 가격 검증
export const validateStopLossPrice = (
  start: number | null,
  stop: number | null,
  setStopLossError: (error: string) => void
) => {
  // 시작가가 있는데 최저가가 없으면 에러
  if (start && !stop) {
    setStopLossError("최저가를 입력 해주세요.");
    return;
  }

  // 시작가나 최저가가 없으면 에러 초기화
  if (!start || !stop) {
    setStopLossError("");
    return;
  }

  // Zod 스키마 검증
  const stopLossResult = stopLossPriceSchema.safeParse(stop);
  if (!stopLossResult.success) {
    setStopLossError(stopLossResult.error.issues[0]?.message || "");
    return;
  }

  // 최저가가 시작가의 90%를 초과하면 에러
  const maxStopLoss = start * STOP_LOSS_PERCENTAGE;
  setStopLossError(
    stop > maxStopLoss ? "판매 최저가는 판매 시작가의 90%를 초과할 수 없습니다." : ""
  );
};

// 가격 하락 단위 검증
export const validateDropPrice = (
  start: number | null,
  stopLoss: number | null,
  drop: number | null,
  setDropPriceError: (error: string) => void
) => {
  // 시작가가 없거나 하락단위가 null인 경우
  if (!start || drop === null) {
    setDropPriceError("");
    return;
  }

  // 하락단위가 0인 경우
  if (drop === 0) {
    setDropPriceError("가격 하락 단위는 판매 시작가의 0.5% 미만일 수 없습니다.");
    return;
  }

  // Zod 스키마 검증
  const dropPriceResult = dropPriceSchema.safeParse(drop);
  if (!dropPriceResult.success) {
    setDropPriceError(dropPriceResult.error.issues[0]?.message || "");
    return;
  }

  // 검증 규칙 계산
  const minDropPrice = start * MIN_DROP_PERCENTAGE;
  const maxDropPrice = stopLoss ? start - stopLoss : start;

  // 검증 순서: 최소값 → 최대값 → 시작가
  if (drop < minDropPrice) {
    setDropPriceError("가격 하락 단위는 판매 시작가의 0.5% 미만일 수 없습니다.");
    return;
  }

  if (drop > maxDropPrice) {
    setDropPriceError(
      "가격 하락 단위가 너무 큽니다. 단위는 (판매 시작가 - 판매 최저가)보다 작아야 합니다."
    );
    return;
  }

  if (drop >= start) {
    setDropPriceError("가격 하락 단위는 판매 시작가보다 같거나 높을 수 없습니다.");
    return;
  }

  // 모든 검증 통과
  setDropPriceError("");
};

// 전체 폼 유효성 검증
export const isFormValid = (params: FormValidationParams): boolean => {
  const productInfo =
    params.productName.trim() !== "" && params.category !== "" && params.description.trim() !== "";
  const priceInfo =
    params.startPrice !== null && params.stopLossPrice !== null && params.dropPrice !== null;
  const scheduleInfo = params.selectedDate !== null;
  const errorInfo =
    params.startPriceError === "" && params.stopLossError === "" && params.dropPriceError === "";

  return productInfo && priceInfo && scheduleInfo && errorInfo;
};
