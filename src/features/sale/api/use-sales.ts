import { useQuery } from "@tanstack/react-query";

import { MOCK_SELLING_ITEMS, UserSellingItemType } from "@/entities/auction";

// TODO: 실제 API 엔드포인트가 나오면 교체
const getUserSalesList = async (): Promise<UserSellingItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_SELLING_ITEMS), 500);
  });

export const userSaleKeys = {
  all: ["user", "sales"] as const,
};

export function useUserSalesList() {
  return useQuery({
    queryKey: userSaleKeys.all,
    queryFn: getUserSalesList,
  });
}
