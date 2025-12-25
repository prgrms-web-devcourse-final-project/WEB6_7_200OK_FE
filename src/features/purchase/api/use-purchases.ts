import { useQuery } from "@tanstack/react-query";

import { MOCK_PURCHASES, PurchaseItemType } from "@/entities/item";

// TODO: 실제 API 엔드포인트가 나오면 교체
const fetchPurchaseList = async (): Promise<PurchaseItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PURCHASES), 500);
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
