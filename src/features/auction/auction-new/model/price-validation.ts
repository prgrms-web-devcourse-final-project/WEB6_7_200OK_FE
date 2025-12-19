import { useCallback } from "react";

import {
  DEFAULT_DROP_PERCENTAGE,
  STOP_LOSS_PERCENTAGE,
} from "@/entities/auction/model/registration-constants";
import {
  startPriceSchema,
  validateDropPrice,
  validateStopLossPrice,
} from "@/shared/lib/utils/validator/validators";

interface PriceValidationProps {
  startPrice: number | null;
  stopLossPrice: number | null;
  dropPrice: number | null;
  setStopLossPrice: (value: number | null) => void;
  setDropPrice: (value: number | null) => void;
  setStartPriceError: (error: string) => void;
  setStopLossError: (error: string) => void;
  setDropPriceError: (error: string) => void;
}

export function usePriceValidation({
  startPrice,
  stopLossPrice,
  dropPrice,
  setStopLossPrice,
  setDropPrice,
  setStartPriceError,
  setStopLossError,
  setDropPriceError,
}: PriceValidationProps) {
  const handleStartPriceBlur = useCallback(() => {
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
  }, [
    startPrice,
    setStopLossPrice,
    setDropPrice,
    setStartPriceError,
    setStopLossError,
    setDropPriceError,
  ]);

  const handleStopLossPriceBlur = useCallback(() => {
    if (!stopLossPrice) {
      setStopLossError("");
      return;
    }

    validateStopLossPrice(startPrice, stopLossPrice, setStopLossError);
    // 최저가 변경 시 가격 하락 단위도 재검증
    validateDropPrice(startPrice, dropPrice, stopLossPrice, setDropPriceError);
  }, [startPrice, stopLossPrice, dropPrice, setStopLossError, setDropPriceError]);

  const handleDropPriceBlur = useCallback(() => {
    if (!dropPrice) {
      setDropPriceError("");
      return;
    }

    validateDropPrice(startPrice, dropPrice, stopLossPrice, setDropPriceError);
  }, [startPrice, dropPrice, stopLossPrice, setDropPriceError]);

  return {
    handleStartPriceBlur,
    handleStopLossPriceBlur,
    handleDropPriceBlur,
  };
}
