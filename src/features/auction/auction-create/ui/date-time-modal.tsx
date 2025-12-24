"use client";

import { useState } from "react";

import dayjs from "dayjs";
import { X } from "lucide-react";

import { type DateTimeModalProps, type TimeSelection } from "@/entities/date-modal";
import Button from "@/shared/ui/button/button";
import Separator from "@/shared/ui/separator/separator";

import { DateSelector } from "./date-selector";
import { TimeSelector } from "./time-selector";
import {
  combineDateTime,
  DEFAULT_TIME_SELECTION,
  getDateRange,
  getDefaultDate,
  getIsTimeDisabled,
  isValidDateTime,
} from "../model/date-utils";

export function DateTimeModal({
  selectedDate,
  selectedTime,
  onClose,
  onConfirm,
}: DateTimeModalProps) {
  const [viewDate, setViewDate] = useState(() => getDefaultDate(selectedDate));
  const [currentDate, setCurrentDate] = useState<Date | null>(selectedDate);
  const [currentTime, setCurrentTime] = useState<TimeSelection>(
    selectedTime ?? DEFAULT_TIME_SELECTION
  );
  const dateRange = getDateRange();
  const isTimeDisabled = getIsTimeDisabled(currentDate);
  const isValid = currentDate ? isValidDateTime(currentDate, currentTime) : false;

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
    setViewDate(dayjs(date));
  };

  const handleConfirm = () => {
    if (currentDate && isValidDateTime(currentDate, currentTime)) {
      const combinedDate = combineDateTime(currentDate, currentTime);
      onConfirm(combinedDate, currentTime);
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
      <div className="bg-accent fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-xl">
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

        {/* 캘린더 */}
        <div className="mb-6 flex flex-col gap-2">
          <DateSelector
            viewDate={viewDate}
            selectedDate={currentDate}
            dateRange={dateRange}
            onDateSelect={handleDateSelect}
          />
          <p className="text-muted-foreground text-xs">
            * 최소 현재 시간 기준 1일 이후부터 최대 7일 이전까지 선택 가능합니다.
          </p>
        </div>

        {/* 시간 선택 */}
        <div className="mb-6">
          <TimeSelector
            selectedTime={currentTime}
            onTimeChange={setCurrentTime}
            isTimeDisabled={isTimeDisabled}
          />
        </div>

        {/* 확인 버튼 */}
        <div className="flex gap-2">
          <Button type="button" onClick={onClose} variant="outline" className="flex-1">
            취소
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={!isValid} className="flex-1">
            확인
          </Button>
        </div>
      </div>
    </>
  );
}
