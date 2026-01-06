import { useMutation } from "@tanstack/react-query";

import { httpClient } from "@/shared/api/client";
import { dayjs } from "@/shared/lib/utils/dayjs";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

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
  const targetDate = time ? combineDateTime(date, time) : date;
  const localDateTimeString = dayjs(targetDate).format("YYYY-MM-DDTHH:mm:ss");
  return dayjs
    .tz(localDateTimeString, "YYYY-MM-DDTHH:mm:ss", "Asia/Seoul")
    .format("YYYY-MM-DDTHH:mm:ssZZ");
};

const transformFormDataToApiRequest = ({
  formData,
  selectedTime,
}: CreateAuctionParams): CreateAuctionRequest => ({
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
      showToast.success("경매가 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      showToast.error("경매 등록에 실패했습니다. 다시 시도해주세요.");
      console.error("경매 생성 실패:", error);
    },
  });
}
