import { useCallback } from "react";

import { DEFAULT_DROP_PERCENTAGE, STOP_LOSS_PERCENTAGE } from "@/entities/auction";
import {
  startPriceSchema,
  validateDropPrice,
  validateStopLossPrice,
} from "@/shared/lib/utils/validator/validators";

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
    validateDropPrice(startPrice, calculatedDropPrice, calculatedStopLoss, setDropPriceError);
  }, [startPrice, setValue, setStartPriceError, setStopLossError, setDropPriceError]);

  const handleStopLossPriceBlur = useCallback(() => {
    if (!stopLossPrice) {
      setStopLossError("");
      return;
    }

    // 최저가 검증만 수행
    validateStopLossPrice(startPrice, stopLossPrice, setStopLossError);
  }, [startPrice, stopLossPrice, setStopLossError]);

  const handleDropPriceBlur = useCallback(() => {
    if (!dropPrice) {
      setDropPriceError("");
      return;
    }

    // 하락 단위만 검증 수행
    validateDropPrice(startPrice, dropPrice, stopLossPrice, setDropPriceError);
  }, [startPrice, dropPrice, stopLossPrice, setDropPriceError]);

  return {
    handleStartPriceBlur,
    handleStopLossPriceBlur,
    handleDropPriceBlur,
  };
}
