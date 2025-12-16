"use client";

import { useState } from "react";

import { X } from "lucide-react";

import Button from "@/shared/ui/button/button";
import Separator from "@/shared/ui/separator/separator";

import { DEFAULT_TIME_SELECTION, getDefaultDate } from "../model/date-utils";

import type { DateTimeModalProps, TimeSelection } from "../types";

export function DateTimeModal({
  selectedDate,
  selectedTime,
  onClose,
  onConfirm,
}: DateTimeModalProps) {
  const [viewDate, setViewDate] = useState(() => getDefaultDate(selectedDate));
  const [currentDate] = useState<Date | null>(selectedDate);
  const [currentTime] = useState<TimeSelection>(selectedTime ?? DEFAULT_TIME_SELECTION);

  const handlePrevMonth = () => {
    setViewDate(viewDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setViewDate(viewDate.add(1, "month"));
  };

  const handleConfirm = () => {
    if (currentDate) {
      onConfirm(currentDate, currentTime);
    }
  };

  return (
    <>
      {/* 백드롭 */}
      <div
        className="fixed inset-0 z-50 h-full w-full rounded-none bg-black/50 backdrop-blur-sm transition-colors"
        onClick={onClose}
        aria-label="모달 닫기"
        role="presentation"
        tabIndex={-1}
      />

      {/* 모달 */}
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="relative mb-4 flex items-center justify-between pb-4">
          <p className="text-lg font-semibold">경매 시작 일정 선택</p>
          <Button
            type="button"
            onClick={onClose}
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </Button>
          <Separator className="absolute right-0 bottom-0 left-0 h-px" />
        </div>
        {/* 캘린더 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <Button
            type="button"
            onClick={handlePrevMonth}
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
          >
            ←
          </Button>
          <p className="text-base font-medium">{viewDate.format("YYYY년 M월")}</p>
          <Button
            type="button"
            onClick={handleNextMonth}
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
          >
            →
          </Button>
        </div>

        {/* 캘린더 */}
        <div className="mb-6">{/* TODO: 캘린더 영역 추가 */}</div>
        {/* 시간 선택 */}
        <div className="mb-6">{/* TODO: 시간 선택 영역 추가 */}</div>

        {/* 확인 버튼 */}
        <div className="flex gap-2">
          <Button type="button" onClick={onClose} variant="outline" className="flex-1">
            취소
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={!currentDate} className="flex-1">
            확인
          </Button>
        </div>
      </div>
    </>
  );
}
