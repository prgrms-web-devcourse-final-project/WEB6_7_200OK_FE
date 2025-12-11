"use client";

import { useState } from "react";

import { X, Calendar } from "lucide-react";

import Button from "@/shared/ui/button/button";

interface DateTimeModalProps {
  selectedDate: Date | null;
  selectedTime: { hour: number; minute: number; period: string };
  onClose: () => void;
  onConfirm: (date: Date, time: { hour: number; minute: number; period: string }) => void;
}

export function DateTimeModal({
  selectedDate,
  selectedTime,
  onClose,
  onConfirm,
}: DateTimeModalProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [viewDate] = useState(new Date());
  const [time, setTime] = useState(selectedTime);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 8);
  maxDate.setHours(23, 59, 59, 999);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (date: Date) => date < minDate || date > maxDate;

  const isSameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (!isDateDisabled(newDate)) {
      setCurrentDate(newDate);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const days = [];
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    // 요일 헤더
    days.push(
      <div
        key="weekdays"
        className="text-muted-foreground mb-2 grid grid-cols-7 gap-1 text-center text-xs"
      >
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    );

    // 날짜
    const dateButtons = [];
    for (let i = 0; i < firstDay; i++) {
      dateButtons.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const disabled = isDateDisabled(date);
      const selected = isSameDay(date, currentDate);

      let buttonClass = "aspect-square rounded-md text-sm transition-colors ";
      if (disabled) {
        buttonClass += "text-muted-foreground/30 cursor-not-allowed";
      } else if (selected) {
        buttonClass += "bg-brand text-brand-foreground font-semibold";
      } else {
        buttonClass += "hover:bg-accent";
      }

      dateButtons.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          className={buttonClass}
        >
          {day}
        </button>
      );
    }

    days.push(
      <div key="dates" className="grid grid-cols-7 gap-1">
        {dateButtons}
      </div>
    );

    return days;
  };

  return (
    <>
      {/* 백드롭 */}
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="모달 닫기"
      />

      {/* 모달 */}
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">경매 시작 일정 선택</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* 달력 선택 */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span className="text-sm font-medium">날짜 선택</span>
            </div>
            <span className="text-sm">
              {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
            </span>
          </div>

          {renderCalendar()}

          <p className="text-muted-foreground mt-3 text-xs">
            * 최소 24시간 이후부터 최대 7일까지 선택 가능합니다
          </p>
        </div>

        {/* 시간 선택 */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            <span className="text-sm font-medium">시간 선택</span>
          </div>

          <div className="border-input flex h-12 items-center justify-center rounded-md border">
            <span className="text-base">
              {time.period} {time.hour}:{String(time.minute).padStart(2, "0")}
            </span>
          </div>

          {/* 시간 선택 그리드 */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <div className="text-muted-foreground mb-2 text-xs">오전/오후</div>
              <div className="space-y-1">
                {["오전", "오후"].map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setTime({ ...time, period })}
                    className={`w-full rounded py-1.5 transition-colors ${
                      time.period === period
                        ? "bg-brand text-brand-foreground font-semibold"
                        : "bg-accent hover:bg-accent/80"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-muted-foreground mb-2 text-xs">시</div>
              <div className="max-h-32 space-y-1 overflow-y-auto">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => setTime({ ...time, hour })}
                    className={`w-full rounded py-1.5 transition-colors ${
                      time.hour === hour
                        ? "bg-brand text-brand-foreground font-semibold"
                        : "bg-accent hover:bg-accent/80"
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-muted-foreground mb-2 text-xs">분</div>
              <div className="max-h-32 space-y-1 overflow-y-auto">
                {[0, 15, 30, 45].map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    onClick={() => setTime({ ...time, minute })}
                    className={`w-full rounded py-1.5 transition-colors ${
                      time.minute === minute
                        ? "bg-brand text-brand-foreground font-semibold"
                        : "bg-accent hover:bg-accent/80"
                    }`}
                  >
                    {String(minute).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 선택한 일정 표시 */}
        <div className="bg-brand/10 mb-4 rounded-md p-3 text-center">
          <p className="text-brand text-sm font-medium">
            선택된 일정: {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{" "}
            {currentDate.getDate()}일 {time.period} {time.hour}:
            {String(time.minute).padStart(2, "0")}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            취소
          </Button>
          <Button onClick={() => onConfirm(currentDate, time)} className="flex-1">
            확인
          </Button>
        </div>
      </div>
    </>
  );
}
