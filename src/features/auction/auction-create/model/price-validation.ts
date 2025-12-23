import { useCallback } from "react";

import { DEFAULT_DROP_PERCENTAGE, STOP_LOSS_PERCENTAGE } from "@/entities/auction";

import { startPriceSchema, validateDropPrice, validateStopLossPrice } from "./validators";

import type { ItemFormValues } from "./schema";
import type { UseFormSetValue } from "react-hook-form";

interface PriceValidationProps {
  startPrice: number | null;
  stopLossPrice: number | null;
  dropPrice: number | null;
  setValue: UseFormSetValue<ItemFormValues>;
  setStartPriceError: (error: string) => void;
  setStopLossError: (error: string) => void;
  setDropPriceError: (error: string) => void;
}

export function usePriceValidation({
  startPrice,
  stopLossPrice,
  dropPrice,
  setValue,
  setStartPriceError,
  setStopLossError,
  setDropPriceError,
}: PriceValidationProps) {
  const handleStartPriceBlur = useCallback(() => {
    if (startPrice === null || startPrice === 0) {
      setStartPriceError("판매 시작가를 입력해주세요.");
      return;
    }

    if (!startPrice) {
      setValue("stopLossPrice", null, { shouldValidate: false, shouldDirty: false });
      setValue("dropPrice", null, { shouldValidate: false, shouldDirty: false });
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
    setValue("stopLossPrice", calculatedStopLoss, { shouldValidate: false, shouldDirty: false });
    validateStopLossPrice(startPrice, calculatedStopLoss, setStopLossError);

    // 가격 하락 단위 자동 계산 (시작가의 1%)
    const calculatedDropPrice = Math.floor(startPrice * DEFAULT_DROP_PERCENTAGE);
    setValue("dropPrice", calculatedDropPrice, { shouldValidate: false, shouldDirty: false });
    validateDropPrice(startPrice, calculatedStopLoss, calculatedDropPrice, setDropPriceError);
  }, [startPrice, setValue, setStartPriceError, setStopLossError, setDropPriceError]);

  const handleStopLossPriceBlur = useCallback(() => {
    if (stopLossPrice === null) {
      setStopLossError("판매 최저가를 입력해주세요.");
      return;
    }

    // 최저가 검증만 수행
    validateStopLossPrice(startPrice, stopLossPrice, setStopLossError);
  }, [startPrice, stopLossPrice, setStopLossError]);

  const handleDropPriceBlur = useCallback(() => {
    if (dropPrice === null) {
      setDropPriceError("가격 하락 단위를 입력해주세요.");
      return;
    }

    // 하락 단위만 검증 수행
    validateDropPrice(startPrice, stopLossPrice, dropPrice, setDropPriceError);
  }, [startPrice, dropPrice, stopLossPrice, setDropPriceError]);

  return {
    handleStartPriceBlur,
    handleStopLossPriceBlur,
    handleDropPriceBlur,
  };
}
