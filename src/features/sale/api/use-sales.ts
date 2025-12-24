import { useQuery } from "@tanstack/react-query";

import { MOCK_SELLING_ITEMS, SellingItemType } from "@/entities/item";

// TODO: 실제 API 엔드포인트가 나오면 교체
const fetchSalesList = async (): Promise<SellingItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_SELLING_ITEMS), 500);
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
