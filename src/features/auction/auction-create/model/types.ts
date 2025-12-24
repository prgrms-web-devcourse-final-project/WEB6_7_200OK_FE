import type { Hour, TimeZone } from "@/entities/auction/model/registration-constants";
import { type Dayjs } from "@/shared/lib/utils/dayjs";

export interface ItemFormSubmitData {
  productName: string;
  category: string;
  description: string;
  tags: string[];
  startPrice: number;
  stopLossPrice: number;
  dropPrice: number;
  auctionStartDate: Date;
}

export interface TimeSelection {
  hour: Hour;
  minute: number;
  timezone: TimeZone;
}

export interface DateTimeModalProps {
  selectedDate: Date | null;
  selectedTime: TimeSelection | null;
  onClose: () => void;
  onConfirm: (date: Date, time: TimeSelection) => void;
}

export interface DateSelectorProps {
  viewDate: Dayjs;
  selectedDate: Date | null;
  dateRange: DateRange;
  onDateSelect: (date: Date) => void;
}

export interface DateRange {
  minDate: Date;
  maxDate: Date;
}
