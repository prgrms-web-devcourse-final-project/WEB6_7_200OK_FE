import { useQuery } from "@tanstack/react-query";

import { UserPurchaseItemType } from "@/entities/auction";

// TODO: 실제 API 엔드포인트가 나오면 교체
const getUserPurchaseList = async (): Promise<UserPurchaseItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve([]), 500);
  });

export const userPurchaseKeys = {
  all: ["user", "purchases"] as const,
};

export function useUserPurchaseList() {
  return useQuery({
    queryKey: userPurchaseKeys.all,
    queryFn: getUserPurchaseList,
  });
}
