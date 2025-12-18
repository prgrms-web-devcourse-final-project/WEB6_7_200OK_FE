"use client";

import { useCallback, useMemo, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Calendar,
  dayjsLocalizer,
  EventProps,
  ToolbarProps,
  View,
  DateHeaderProps,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

import { CalendarEvent } from "../model/types";

dayjs.locale("ko");
const localizer = dayjsLocalizer(dayjs);

interface AuctionCalendarProps {
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

const createDateHeaderWrapper =
  (selectedDate: Date | null, currentDate: Date, onSelectDate: (date: Date) => void) =>
  (props: DateHeaderProps) => (
    <CustomDateHeader
      {...props}
      selectedDate={selectedDate}
      currentViewDate={currentDate}
      onSelectDate={onSelectDate}
    />
  );

const CustomToolbar = ({ date, onNavigate }: ToolbarProps<CalendarEvent>) => (
  <div className="flex h-7 w-full items-center justify-between px-0.5 pb-6">
    <h3 className="text-foreground text-sm leading-5 font-semibold tracking-tight">
      {dayjs(date).format("YYYY년 M월")}
    </h3>
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        className="hover:bg-secondary/50 h-7 w-7 rounded-lg"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="hover:bg-secondary/50 h-7 w-7 rounded-lg"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const CustomHeader = ({ date }: { date: Date }) => {
  const day = dayjs(date).day();
  const colorClass = cn(
    "text-foreground",
    day === 0 && "text-red-500",
    day === 6 && "text-blue-500"
  );

  return (
    <span className={cn("text-xs leading-5 font-medium tracking-normal", colorClass)}>
      {dayjs(date).format("ddd")}
    </span>
  );
};

interface CustomDateHeaderProps extends DateHeaderProps {
  selectedDate: Date | null;
  currentViewDate: Date;
  onSelectDate: (date: Date) => void;
}

const CustomDateHeader = ({
  label,
  date,
  selectedDate,
  currentViewDate,
  onSelectDate,
}: CustomDateHeaderProps) => {
  const isSelected = selectedDate && dayjs(date).isSame(selectedDate, "day");
  const isOffRange = dayjs(date).month() !== dayjs(currentViewDate).month();
  const day = dayjs(date).day();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectDate(date);
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleClick}
      disabled={isOffRange}
      className={cn(
        "rounded-full text-sm",
        // 선택된 날짜 - brand-surface 배경색 사용
        isSelected && "bg-brand-surface",
        // 범위 밖 날짜 스타일
        isOffRange &&
          "text-muted-foreground hover:text-muted-foreground cursor-default opacity-50 hover:bg-transparent",
        // 요일별 색상
        !isOffRange && cn(day === 0 && "text-red-500", day === 6 && "text-blue-500")
      )}
    >
      {label}
    </Button>
  );
};

const CustomEvent = ({ event }: EventProps<CalendarEvent>) => {
  const isProgress = event.type === "progress";
  return (
    <div
      className={cn(
        "pointer-events-none mx-auto mb-0.5 flex h-3.5 w-full max-w-8 items-center justify-center rounded",
        isProgress ? "bg-brand" : "bg-zinc-200 dark:bg-zinc-700"
      )}
    >
      <span
        className={cn(
          "text-[10px] leading-3 font-medium tracking-wide whitespace-nowrap",
          isProgress ? "text-white" : "text-zinc-600 dark:text-zinc-400"
        )}
      >
        {event.title}
      </span>
    </div>
  );
};

export function AuctionCalendar({ events, onSelectDate, selectedDate }: AuctionCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [currentView, setCurrentView] = useState<View>("month");

  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView: View) => {
    setCurrentView(newView);
  }, []);

  const { components } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,
        event: CustomEvent,
        month: {
          header: CustomHeader,
          dateHeader: createDateHeaderWrapper(selectedDate, currentDate, onSelectDate),
        },
      },
    }),
    [selectedDate, currentDate, onSelectDate]
  );

  return (
    <>
      <style>
        {`.clean-calendar .rbc-month-view,
          .clean-calendar .rbc-header,
          .clean-calendar .rbc-month-row,
          .clean-calendar .rbc-day-bg,
          .clean-calendar .rbc-date-cell {
            border: none !important;
          }
          .clean-calendar .rbc-header {
            padding-bottom: 0.75rem;
            font-weight: 500;
          }
          .clean-calendar .rbc-off-range-bg {
            background: transparent !important;
          }
          .clean-calendar .rbc-row-content {
            z-index: 5;
            pointer-events: none;
          }
          .clean-calendar .rbc-date-cell {
            pointer-events: auto !important;
            padding: 0.25rem 0 0 0;
            text-align: center;
          }
          .clean-calendar .rbc-date-cell button {
            margin: 0 auto;
          }
          .clean-calendar .rbc-today button,
          .clean-calendar .rbc-now button {
            font-weight: normal !important;
          }`}
      </style>
      <div className="bg-card border-border flex w-full flex-col gap-4 rounded-lg border p-6 shadow-sm">
        <div className="h-102 w-full">
          <Calendar
            className="clean-calendar"
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
            views={["month"]}
            view={currentView}
            date={currentDate}
            onView={handleViewChange}
            onNavigate={handleNavigate}
            onSelectSlot={() => {}}
            selectable
            components={components}
            eventPropGetter={() => ({
              style: {
                backgroundColor: "transparent",
                padding: 0,
                outline: "none",
              },
            })}
            dayPropGetter={() => ({
              style: { backgroundColor: "transparent", cursor: "default" },
            })}
            formats={{
              monthHeaderFormat: "YYYY년 M월",
              weekdayFormat: "ddd",
              dateFormat: "D",
            }}
            culture="ko"
          />
        </div>

        <div className="border-border bg-secondary/30 flex w-full flex-col gap-3 rounded-lg border px-3 py-3">
          <span className="text-muted-foreground text-sm leading-5 font-normal tracking-normal">
            선택된 날짜
          </span>
          <span className="text-brand text-base leading-6 font-medium tracking-tight">
            {selectedDate ? dayjs(selectedDate).format("YYYY년 M월 D일") : "날짜를 선택해주세요"}
          </span>
        </div>
      </div>
    </>
  );
}
