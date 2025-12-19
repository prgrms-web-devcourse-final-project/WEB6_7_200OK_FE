import { InfoAlert } from "@/shared/ui/info-alert/info-alert";

import { PriceInput } from "./price-input";

interface PriceInputSectionProps {
  startPrice: number | null;
  stopLossPrice: number | null;
  dropPrice: number | null;
  startPriceError: string;
  stopLossError: string;
  dropPriceError: string;
  onStartPriceChange: (value: number | null) => void;
  onStopLossPriceChange: (value: number | null) => void;
  onDropPriceChange: (value: number | null) => void;
  onStartPriceBlur: () => void;
  onStopLossPriceBlur: () => void;
  onDropPriceBlur: () => void;
}

export function PriceInputSection({
  startPrice,
  stopLossPrice,
  dropPrice,
  startPriceError,
  stopLossError,
  dropPriceError,
  onStartPriceChange,
  onStopLossPriceChange,
  onDropPriceChange,
  onStartPriceBlur,
  onStopLossPriceBlur,
  onDropPriceBlur,
}: PriceInputSectionProps) {
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

  return (
    <>
      {/* 판매 시작가 */}
      <div>
        <label htmlFor="start-price" className="mb-2 block text-sm font-medium">
          판매 시작가
        </label>
        <PriceInput
          id="start-price"
          placeholder="0"
          value={startPrice ?? ""}
          onChange={(e) => handlePriceChange(e, onStartPriceChange)}
          onBlur={onStartPriceBlur}
          error={startPriceError}
        />
      </div>

      {/* 판매 최저가 (Stop Loss) */}
      <div>
        <label htmlFor="stop-loss-price" className="mb-2 block text-sm font-medium">
          판매 최저가 (Stop Loss)
        </label>
        <PriceInput
          id="stop-loss-price"
          placeholder="시작가의 90% 이하 가격을 설정해주세요."
          value={stopLossPrice ?? ""}
          onChange={(e) => handlePriceChange(e, onStopLossPriceChange)}
          onBlur={onStopLossPriceBlur}
          error={stopLossError}
        />
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
        <PriceInput
          id="drop-price"
          placeholder="시작가의 0.5% 이상 가격을 설정해주세요."
          value={dropPrice ?? ""}
          onChange={(e) => handlePriceChange(e, onDropPriceChange)}
          onBlur={onDropPriceBlur}
          error={dropPriceError}
        />
        <InfoAlert
          message="5분마다 설정된 가격이 자동으로 하락합니다. 최소 가격은 시작 가격의 0.5%입니다."
          className="mt-2"
        />
      </div>
    </>
  );
}
