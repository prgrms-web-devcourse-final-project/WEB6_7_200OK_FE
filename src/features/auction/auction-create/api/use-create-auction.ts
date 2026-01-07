import { useMutation, useQueryClient } from "@tanstack/react-query";

import { httpClient } from "@/shared/api/client";
import { dayjs } from "@/shared/lib/utils/dayjs";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

import { userSaleKeys } from "../../auction-sale/api/use-sales"; // users 판매 목록 갱신
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
    const combinedDate = combineDateTime(date, time);
    const kstDateTime = dayjs(combinedDate).tz("Asia/Seoul");
    return dayjs.utc(kstDateTime.format("YYYY-MM-DDTHH:mm:ss")).toISOString();
  }
  return dayjs(date).tz("Asia/Seoul").utc().toISOString();
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
  const queryClient = useQueryClient(); // users 판매 목록 갱신
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
      queryClient.invalidateQueries({ queryKey: userSaleKeys.all }); // users 판매 목록 갱신
    },
    onError: (error) => {
      showToast.error("경매 등록에 실패했습니다. 다시 시도해주세요.");
      console.error("경매 생성 실패:", error);
    },
  });
}
