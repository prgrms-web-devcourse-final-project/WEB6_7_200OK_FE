import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { httpClient } from "@/shared/api/client";

import { combineDateTime } from "../utils/date-utils";

import type {
  CreateAuctionRequest,
  CreateAuctionResponseData,
  ItemFormSubmitData,
  TimeSelection,
} from "../model/types";

interface CreateAuctionParams {
  formData: ItemFormSubmitData;
  selectedTime: TimeSelection | null;
}

const formatStartAt = (date: Date, time: TimeSelection | null): string => {
  if (time) {
    return combineDateTime(date, time).toISOString();
  }
  return date.toISOString();
};

const transformFormDataToApiRequest = ({
  formData,
  selectedTime,
}: CreateAuctionParams): CreateAuctionRequest => ({
  sellerId: Number(formData.sellerId),
  title: formData.title,
  description: formData.description,
  category: formData.category,
  imageIds: formData.imageIds,
  startPrice: formData.startPrice,
  stopLoss: formData.stopLoss,
  dropAmount: formData.dropAmount,
  startAt: formatStartAt(formData.startAt, selectedTime),
  ...(formData.tags.length > 0 && { tags: formData.tags }),
});

export function useCreateAuction() {
  return useMutation<CreateAuctionResponseData, Error, CreateAuctionParams>({
    mutationFn: async (params) => {
      const requestBody = transformFormDataToApiRequest(params);
      const response = await httpClient<CreateAuctionResponseData, CreateAuctionRequest>(
        "/api/v1/auctions",
        {
          method: "POST",
          body: requestBody,
        }
      );

      return response.data;
    },
    onSuccess: (_data) => {
      toast.success("경매가 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      toast.error("경매 등록에 실패했습니다. 다시 시도해주세요.");
      console.error("경매 생성 실패:", error);
    },
  });
}
