import type { HttpStatusType } from "@/shared/api/types/status";

export interface ApiResponseType<T> {
  status: HttpStatusType;
  message: string;
  data: T;
}
