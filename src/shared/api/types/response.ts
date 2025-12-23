import type { HttpStatusType } from "@/shared/api/types/status";

export interface ApiResponseType<T> {
  code: number;
  status: HttpStatusType;
  message: string;
  data: T;
}
