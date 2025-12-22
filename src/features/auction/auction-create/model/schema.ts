import { z } from "zod";

import type { Hour, TimeZone } from "@/entities/auction";

// zod 스키마
export const itemFormSchema = z.object({
  productName: z.string().trim().min(1, "상품명을 입력해주세요"),
  category: z.string().min(1, "카테고리를 선택해주세요"),
  description: z.string().trim().min(1, "상세 정보를 입력해주세요"),
  tags: z.array(z.string()),
  startPrice: z.number().nullable(),
  stopLossPrice: z.number().nullable(),
  dropPrice: z.number().nullable(),
  selectedDate: z.date().nullable(),
  selectedTime: z
    .object({
      hour: z.custom<Hour>((val) => typeof val === "number" && val >= 0 && val <= 12),
      minute: z.number(),
      timezone: z.enum(["오전", "오후"] as [TimeZone, ...TimeZone[]]),
    })
    .nullable(),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;
