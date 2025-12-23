import { useCallback } from "react";

import { DEFAULT_DROP_PERCENTAGE, STOP_LOSS_PERCENTAGE } from "@/entities/auction";

import { startPriceSchema, validateDropPrice, validateStopLossPrice } from "./validators";

import type { ItemFormValues } from "./schema";
import type {
  UseFormSetValue,
  UseFormSetError,
  UseFormClearErrors,
  UseFormGetValues,
} from "react-hook-form";

interface PriceValidationProps {
  setValue: UseFormSetValue<ItemFormValues>;
  setError: UseFormSetError<ItemFormValues>;
  clearErrors: UseFormClearErrors<ItemFormValues>;
  getValues: UseFormGetValues<ItemFormValues>;
}

export function usePriceValidation({
  setValue,
  setError,
  clearErrors,
  getValues,
}: PriceValidationProps) {
  const handleStartPriceBlur = useCallback(() => {
    // blur 시점의 최신 값을 가져옴
    const currentStartPrice = getValues("startPrice");

    if (currentStartPrice === null || currentStartPrice === 0) {
      setError("startPrice", { type: "manual", message: "판매 시작가를 입력해주세요." });
      return;
    }

    if (!currentStartPrice) {
      setValue("stopLossPrice", null, { shouldValidate: false, shouldDirty: false });
      setValue("dropPrice", null, { shouldValidate: false, shouldDirty: false });
      clearErrors(["startPrice", "stopLossPrice", "dropPrice"]);
      return;
    }

    // 시작가 검증
    const startPriceResult = startPriceSchema.safeParse(currentStartPrice);
    if (!startPriceResult.success) {
      setError("startPrice", {
        type: "manual",
        message: startPriceResult.error.issues[0]?.message || "",
      });
      return;
    }
    clearErrors("startPrice");

    // 스탑로스 자동 계산 (시작가의 90%)
    const calculatedStopLoss = Math.floor(currentStartPrice * STOP_LOSS_PERCENTAGE);
    setValue("stopLossPrice", calculatedStopLoss, { shouldValidate: false, shouldDirty: false });
    validateStopLossPrice(currentStartPrice, calculatedStopLoss, (error) => {
      if (error) {
        setError("stopLossPrice", { type: "manual", message: error });
      } else {
        clearErrors("stopLossPrice");
      }
    });

    // 가격 하락 단위 자동 계산 (시작가의 1%)
    const calculatedDropPrice = Math.floor(currentStartPrice * DEFAULT_DROP_PERCENTAGE);
    setValue("dropPrice", calculatedDropPrice, { shouldValidate: false, shouldDirty: false });
    validateDropPrice(currentStartPrice, calculatedStopLoss, calculatedDropPrice, (error) => {
      if (error) {
        setError("dropPrice", { type: "manual", message: error });
      } else {
        clearErrors("dropPrice");
      }
    });
  }, [getValues, setValue, setError, clearErrors]);

  const handleStopLossPriceBlur = useCallback(() => {
    const currentStartPrice = getValues("startPrice");
    const currentStopLossPrice = getValues("stopLossPrice");

    if (currentStopLossPrice === null || currentStopLossPrice === 0) {
      setError("stopLossPrice", { type: "manual", message: "판매 최저가를 입력해주세요." });
      return;
    }

    // 최저가 검증만 수행
    validateStopLossPrice(currentStartPrice, currentStopLossPrice, (error) => {
      if (error) {
        setError("stopLossPrice", { type: "manual", message: error });
      } else {
        clearErrors("stopLossPrice");
      }
    });
  }, [getValues, setError, clearErrors]);

  const handleDropPriceBlur = useCallback(() => {
    const currentStartPrice = getValues("startPrice");
    const currentStopLossPrice = getValues("stopLossPrice");
    const currentDropPrice = getValues("dropPrice");

    if (currentDropPrice === null || currentDropPrice === 0) {
      setError("dropPrice", { type: "manual", message: "가격 하락 단위를 입력해주세요." });
      return;
    }

    // 하락 단위만 검증 수행
    validateDropPrice(currentStartPrice, currentStopLossPrice, currentDropPrice, (error) => {
      if (error) {
        setError("dropPrice", { type: "manual", message: error });
      } else {
        clearErrors("dropPrice");
      }
    });
  }, [getValues, setError, clearErrors]);

  return {
    handleStartPriceBlur,
    handleStopLossPriceBlur,
    handleDropPriceBlur,
  };
}
