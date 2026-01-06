/* src/features/notification-preference/ui/notification-preference-settings-modal.tsx */
"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { Package, BellRing } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  ConfirmDeleteModal,
  Switch,
} from "@/shared/ui";

import { NotificationPreferenceItemType } from "../model/types";

// 부모 컴포넌트와 통신하기 위한 데이터 타입
export interface NotificationSettingsData {
  auctionStart: boolean;
  auctionEnd: boolean;
  priceReached: boolean;
  price: number;
}

interface NotificationPreferenceSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: NotificationPreferenceItemType | null;
  // [추가] 외부에서 주입받는 데이터 및 핸들러
  isLoading?: boolean;
  initialSettings?: NotificationSettingsData;
  onSave?: (data: NotificationSettingsData) => void;
}

export function NotificationPreferenceSettingsModal({
  open,
  onOpenChange,
  item,
  isLoading = false,
  initialSettings,
  onSave,
}: NotificationPreferenceSettingsModalProps) {
  const [startAlert, setStartAlert] = useState(false);
  const [endAlert, setEndAlert] = useState(true);
  const [priceAlert, setPriceAlert] = useState(true);
  const [targetPrice, setTargetPrice] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const isAllOff = !startAlert && !endAlert && !priceAlert;

  // [핵심] 모달이 열리고 서버 데이터(initialSettings)가 들어오면 로컬 상태 동기화
  useEffect(() => {
    if (open && initialSettings) {
      setStartAlert(initialSettings.auctionStart);
      setEndAlert(initialSettings.auctionEnd);
      setPriceAlert(initialSettings.priceReached);
      // UI용 콤마 포맷
      setTargetPrice(initialSettings.price > 0 ? initialSettings.price.toLocaleString() : "");
    } else if (!open) {
      // 모달 닫힐 때 초기화 (선택사항)
      setTargetPrice("");
    }
  }, [open, initialSettings]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue === "") {
      setTargetPrice("");
      return;
    }
    setTargetPrice(Number(rawValue).toLocaleString());
  };

  if (!item) return null;

  const handleSaveOrDelete = () => {
    if (isAllOff) {
      setShowDeleteConfirm(true);
    } else {
      setShowSaveConfirm(true);
    }
  };

  const handleRealSave = () => {
    // UI 포맷(콤마 문자열) -> 데이터 포맷(숫자) 변환 후 부모에게 전달
    const data: NotificationSettingsData = {
      auctionStart: startAlert,
      auctionEnd: endAlert,
      priceReached: priceAlert,
      price: priceAlert ? Number(targetPrice.replace(/,/g, "")) : 0,
    };

    onSave?.(data); // 부모의 Mutation 실행
    setShowSaveConfirm(false);
    // 모달 닫기는 부모의 onSuccess에서 처리하거나 여기서 즉시 처리
    // 여기서는 즉시 닫는 것으로 처리
    onOpenChange(false);
  };

  const handleRealDelete = () => {
    // 삭제 == 모든 알림 끄기
    const data: NotificationSettingsData = {
      auctionStart: false,
      auctionEnd: false,
      priceReached: false,
      price: 0,
    };

    onSave?.(data);
    setShowDeleteConfirm(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-background w-[90%] gap-4 rounded-lg p-4 sm:max-w-md sm:p-6">
          <DialogHeader className="flex h-5 flex-row items-center gap-2 space-y-0">
            <BellRing className="text-brand h-5 w-5 shrink-0" />
            <DialogTitle className="text-foreground text-lg leading-none font-semibold tracking-tight">
              알림 설정
            </DialogTitle>
          </DialogHeader>

          {/* 로딩 상태 처리 */}
          {isLoading && !initialSettings ? (
            <div className="flex h-40 w-full items-center justify-center">
              <span className="text-muted-foreground text-sm">설정 정보를 불러오는 중...</span>
            </div>
          ) : (
            <>
              <div className="bg-secondary mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 sm:h-22 sm:py-0">
                <div className="bg-background/50 relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg ring-1 ring-black/5 sm:h-16 sm:w-16 dark:ring-white/10">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  ) : (
                    <Package className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-foreground line-clamp-2 text-sm leading-5 font-medium sm:line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-brand text-xs leading-4 font-medium">
                    {item.price.toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="bg-secondary flex h-12 w-full items-center justify-between rounded-lg px-3 sm:h-14 sm:px-4">
                  <label
                    htmlFor="start-alert"
                    className="text-foreground cursor-pointer text-sm leading-5 font-medium"
                  >
                    경매 시작 알림
                  </label>
                  <Switch id="start-alert" checked={startAlert} onCheckedChange={setStartAlert} />
                </div>

                <div className="bg-secondary flex h-12 w-full items-center justify-between rounded-lg px-3 sm:h-14 sm:px-4">
                  <label
                    htmlFor="end-alert"
                    className="text-foreground cursor-pointer text-sm leading-5 font-medium"
                  >
                    경매 종료 알림
                  </label>
                  <Switch id="end-alert" checked={endAlert} onCheckedChange={setEndAlert} />
                </div>

                <div className="bg-secondary flex w-full flex-col gap-3 rounded-lg p-3 sm:p-4">
                  <div className="flex h-6 w-full items-center justify-between">
                    <label
                      htmlFor="price-alert"
                      className="text-foreground cursor-pointer text-sm leading-5 font-medium"
                    >
                      가격 도달 알림
                    </label>
                    <Switch id="price-alert" checked={priceAlert} onCheckedChange={setPriceAlert} />
                  </div>

                  {priceAlert && (
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="target-price"
                        className="text-muted-foreground text-xs leading-4 font-medium"
                      >
                        희망 가격
                      </label>
                      <div className="relative h-9 w-full">
                        <Input
                          id="target-price"
                          type="text"
                          inputMode="numeric"
                          value={targetPrice}
                          onChange={handlePriceChange}
                          placeholder="가격을 입력하세요"
                          className="h-9 pr-9"
                        />
                        <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                          원
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="mt-2 flex w-full gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-input bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground h-10 flex-1 rounded-lg sm:h-9"
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleSaveOrDelete}
              className={cn(
                "h-10 flex-1 rounded-lg sm:h-9",
                isAllOff
                  ? "bg-destructive hover:bg-destructive/90 text-white"
                  : "bg-brand text-brand-contrast hover:bg-brand/90"
              )}
            >
              {isAllOff ? "알림 삭제" : "저장"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteModal
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleRealDelete}
        title="알림을 삭제하시겠습니까?"
        description="모든 알림 설정이 꺼져있어 알림 목록에서 삭제됩니다."
        confirmText="삭제하기"
        variant="destructive"
      />

      <ConfirmDeleteModal
        open={showSaveConfirm}
        onOpenChange={setShowSaveConfirm}
        onConfirm={handleRealSave}
        title="알림 설정을 저장하시겠습니까?"
        description="변경하신 알림 조건이 적용됩니다."
        confirmText="저장"
        cancelText="취소"
        variant="brand"
      />
    </>
  );
}
