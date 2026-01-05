import type { ItemCategory, AuctionStatusType } from "@/entities/auction";
import type { Hour, TimeZone } from "@/entities/auction/model/registration-constants";
import type { ApiResponseType } from "@/shared/api/types/response";
import { type Dayjs } from "@/shared/lib/utils/dayjs";

export interface ItemFormSubmitData {
  title: string;
  description: string;
  category: ItemCategory;
  tags: { name: string }[];
  imageIds: number[];
  startPrice: number;
  stopLoss: number;
  dropAmount: number;
  startAt: Date;
}

export interface CreateAuctionRequest {
  title: string;
  description: string;
  category: ItemCategory;
  tags?: { name: string }[];
  imageIds: number[];
  startPrice: number;
  stopLoss: number;
  dropAmount: number;
  startAt: string;
}

export interface CreateAuctionResponseData {
  auctionId: number;
  title: string;
  description: string;
  category: ItemCategory;
  tags?: string[];
  startPrice: number;
  currentPrice: number;
  stopLoss: number;
  dropAmount: number;
  status: AuctionStatusType;
  startAt: string;
}

export type CreateAuctionResponse = ApiResponseType<CreateAuctionResponseData>;

export interface UploadImageResponse {
  imageId: number;
  imageUrl: string;
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
  onViewDateChange: (date: Dayjs) => void;
}

export interface DateRange {
  minDate: Date;
  maxDate: Date;
}
