import type { ErrorCodeType, ErrorStatusType } from "@/shared/api/types/error";

export type ApiStatusType = `${ErrorCodeType} ${ErrorStatusType}`;

export interface ApiResponseType<T> {
  status: ApiStatusType;
  message: string;
  data: T;
}
