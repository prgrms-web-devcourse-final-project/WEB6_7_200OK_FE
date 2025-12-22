import { useQuery } from "@tanstack/react-query";

import { MOCK_SELLING_ITEMS, SellingItemType } from "@/entities/item";

// API 시뮬레이션 함수
const fetchSalesList = async (): Promise<SellingItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_SELLING_ITEMS), 500); // 서버 지연 테스트 0.5초
  });

export const saleKeys = {
  all: ["user", "sales"] as const,
};

export function useSalesList() {
  return useQuery({
    queryKey: saleKeys.all,
    queryFn: fetchSalesList,
  });
}
