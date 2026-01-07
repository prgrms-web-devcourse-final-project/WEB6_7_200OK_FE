import type { HttpStatusType } from "@/shared/api/types/status";

export interface ApiResponseType<T> {
  code: number;
  status: HttpStatusType;
  message: string;
  data: T;
}

export interface SliceResponseType<T> {
  slice: T[];
  hasNext: boolean;
  page: number;
  size: number;
  timeStamp: string;
}
