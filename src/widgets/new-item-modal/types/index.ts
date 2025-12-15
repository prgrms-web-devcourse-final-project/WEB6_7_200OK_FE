import { Dayjs } from "dayjs";

export type TimeZone = "오전" | "오후";

export interface TimeSelection {
  hour: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  minute: number;
  timezone: TimeZone;
}

export interface DateTimeSelection {
  date: Date;
  time: TimeSelection;
}

export interface DateTimeModalProps {
  selectedDate: Date | null;
  selectedTime: TimeSelection;
  onClose: () => void;
  onConfirm: (date: Date, time: TimeSelection) => void;
}

export interface CalendarViewProps {
  viewDate: Dayjs;
  selectedDate: Date | null;
  dateRange: DateRange;
  onDateSelect: (date: Date) => void;
}

export interface DateRange {
  minDate: Date;
  maxDate: Date;
}
