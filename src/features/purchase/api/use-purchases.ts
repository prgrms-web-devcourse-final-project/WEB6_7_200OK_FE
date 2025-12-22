import { useQuery } from "@tanstack/react-query";

import { MOCK_PURCHASES, PurchaseItemType } from "@/entities/item";

const fetchPurchaseList = async (): Promise<PurchaseItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PURCHASES), 500); // 서버 지연 테스트 0.5초
  });

export const purchaseKeys = {
  all: ["user", "purchases"] as const,
};

export function usePurchaseList() {
  return useQuery({
    queryKey: purchaseKeys.all,
    queryFn: fetchPurchaseList,
  });
}
