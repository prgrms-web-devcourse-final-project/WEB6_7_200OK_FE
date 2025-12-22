import { Controller, type Control } from "react-hook-form";

import { PriceInput } from "@/entities/auction";
import { InfoAlert } from "@/shared/ui/info-alert/info-alert";

import type { ItemFormValues } from "../model/schema";

interface PriceInputSectionProps {
  control: Control<ItemFormValues>;
  startPriceError: string;
  stopLossError: string;
  dropPriceError: string;
  onStartPriceBlur: () => void;
  onStopLossPriceBlur: () => void;
  onDropPriceBlur: () => void;
}

export function PriceInputSection({
  control,
  startPriceError,
  stopLossError,
  dropPriceError,
  onStartPriceBlur,
  onStopLossPriceBlur,
  onDropPriceBlur,
}: PriceInputSectionProps) {
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: number | null) => void
  ) => {
    const { value } = e.target;

    if (!value) {
      onChange(null);
      return;
    }

    const numValue = Number(value);
    if (Number.isNaN(numValue)) return;

    onChange(numValue);
  };

  return (
    <>
      {/* 판매 시작가 */}
      <Controller
        name="startPrice"
        control={control}
        rules={{ validate: () => true }}
        render={({ field }) => (
          <div>
            <label htmlFor="start-price" className="mb-2 block text-sm font-medium">
              판매 시작가
            </label>
            <PriceInput
              id="start-price"
              placeholder="0"
              value={field.value ?? ""}
              onChange={(e) => handlePriceChange(e, field.onChange)}
              onBlur={() => {
                field.onBlur();
                onStartPriceBlur();
              }}
              error={startPriceError}
            />
          </div>
        )}
      />

      {/* 판매 최저가 (Stop Loss) */}
      <Controller
        name="stopLossPrice"
        control={control}
        rules={{ validate: () => true }}
        render={({ field }) => (
          <div>
            <label htmlFor="stop-loss-price" className="mb-2 block text-sm font-medium">
              판매 최저가 (Stop Loss)
            </label>
            <PriceInput
              id="stop-loss-price"
              placeholder="시작가의 90% 이하 가격을 설정해주세요."
              value={field.value ?? ""}
              onChange={(e) => handlePriceChange(e, field.onChange)}
              onBlur={() => {
                field.onBlur();
                onStopLossPriceBlur();
              }}
              error={stopLossError}
            />
            <InfoAlert
              message="최저가는 판매자만 볼 수 있으며, 이 가격까지 판매되지 않으면 경매가 자동으로 종료됩니다."
              className="mt-2"
            />
          </div>
        )}
      />

      {/* 가격 하락 단위 */}
      <Controller
        name="dropPrice"
        control={control}
        rules={{ validate: () => true }}
        render={({ field }) => (
          <div>
            <label htmlFor="drop-price" className="mb-2 block text-sm font-medium">
              가격 하락 단위
            </label>
            <PriceInput
              id="drop-price"
              placeholder="시작가의 0.5% 이상 가격을 설정해주세요."
              value={field.value ?? ""}
              onChange={(e) => handlePriceChange(e, field.onChange)}
              onBlur={() => {
                field.onBlur();
                onDropPriceBlur();
              }}
              error={dropPriceError}
            />
            <InfoAlert
              message="5분마다 설정된 가격이 자동으로 하락합니다. 최소 가격은 시작 가격의 0.5%입니다."
              className="mt-2"
            />
          </div>
        )}
      />
    </>
  );
}
