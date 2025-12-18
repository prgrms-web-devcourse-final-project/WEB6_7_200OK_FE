"use client";

import { useMemo } from "react";

import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

import type { DateSelectorProps } from "@/entities/date-modal";
import { cn } from "@/shared/lib/utils/utils";
import { Calendar } from "@/shared/ui/calendar/calendar";

export function DateSelector({
  viewDate,
  selectedDate,
  dateRange,
  onDateSelect,
}: DateSelectorProps) {
  const { minDate, maxDate } = dateRange;
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
        <p className="text-base font-medium">{viewDate.format("YYYY년 M월")}</p>
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
            day: cn("relative flex-1 aspect-square p-0 flex items-center justify-center"),
            day_button: cn(
              "w-full h-full border-none focus:border-none focus:ring-0 focus:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none text-sm font-normal data-[selected-single=true]:bg-brand data-[selected-single=true]:text-accent dark:data-[selected-single=true]:text-accent-foreground data-[selected-single=true]:rounded-md data-[disabled=true]:text-accent data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed flex items-center justify-center"
            ),
          }}
          className="bg-accent w-full"
          showOutsideDays={false}
          captionLayout="label"
        />
      </div>
    </div>
  );
}
