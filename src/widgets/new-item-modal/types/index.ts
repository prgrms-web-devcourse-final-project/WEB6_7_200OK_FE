import { Dayjs } from "dayjs";

export type TimeZone = "오전" | "오후";

export interface TimeSelection {
  hour: number;
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
  onConfirm: () => void;
}

export interface CalendarViewProps {
  viewDate: Dayjs;
  selectedDate: Date | null;
  dateRange: DateRange;
  onDateSelect: () => void;
}

export interface DateRange {
  minDate: Date;
  maxDate: Date;
}
