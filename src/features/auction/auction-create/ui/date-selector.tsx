"use client";

import { useMemo } from "react";

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { dayjs } from "@/shared/lib/utils/dayjs";
import Button from "@/shared/ui/button/button";
import { Calendar } from "@/shared/ui/calendar/calendar";

import type { DateSelectorProps } from "../model/types";

export function DateSelector({
  viewDate,
  selectedDate,
  dateRange,
  onDateSelect,
  onViewDateChange,
}: DateSelectorProps) {
  const { minDate, maxDate } = dateRange;

  // 범위의 시작 월과 끝 월
  const minMonth = dayjs(minDate).startOf("month");
  const maxMonth = dayjs(maxDate).startOf("month");
  const currentMonth = viewDate.startOf("month");

  // 이전/다음 달 확인
  const canGoPrevious = currentMonth.isAfter(minMonth);
  const canGoNext = currentMonth.isBefore(maxMonth);

  const handlePrevious = () => {
    onViewDateChange(viewDate.subtract(1, "month"));
  };

  const handleNext = () => {
    onViewDateChange(viewDate.add(1, "month"));
  };

  // 비활성화 날짜
  const isDisabled = useMemo(
    () => (date: Date) => {
      const dateDayjs = dayjs(date).startOf("day");
      const minDayjs = dayjs(minDate).startOf("day");
      const maxDayjs = dayjs(maxDate).startOf("day");
      // 범위 벗어날 경우 disabled
      return dateDayjs.isBefore(minDayjs) || dateDayjs.isAfter(maxDayjs);
    },
    [minDate, maxDate]
  );

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
    }
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="text-muted-foreground size-4" />
          <h3 className="text-base font-medium">날짜 선택</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <p className="text-base font-medium">{viewDate.format("YYYY년 M월")}</p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleNext}
            disabled={!canGoNext}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="bg-accent w-full rounded-md">
        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={handleSelect}
          month={viewDate.toDate()}
          disabled={isDisabled}
          formatters={{
            formatWeekdayName: (date) => {
              const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
              return weekDays[date.getDay()];
            },
          }}
          classNames={{
            nav: "hidden",
            month_caption: "hidden",
            today: "bg-transparent text-foreground",
            week: "flex w-full",
            day: "relative flex-1 aspect-square p-0 flex items-center justify-center",
            day_button:
              "w-full h-full border-none focus:border-none focus:ring-0 focus:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none text-sm font-normal data-[selected-single=true]:bg-brand data-[selected-single=true]:text-accent dark:data-[selected-single=true]:text-accent-foreground data-[selected-single=true]:rounded-md data-[disabled=true]:text-accent data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed flex items-center justify-center",
          }}
          className="bg-accent w-full"
          showOutsideDays={false}
          captionLayout="label"
        />
      </div>
    </div>
  );
}
