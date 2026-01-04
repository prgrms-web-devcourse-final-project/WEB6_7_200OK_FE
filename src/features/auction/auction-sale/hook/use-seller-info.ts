import { useQuery } from "@tanstack/react-query";

import { sellerInfoQuery } from "@/features/auction/auction-sale/api/seller-info";

export function useSellerInfo(sellerId: number) {
  return useQuery(sellerInfoQuery(sellerId));
}
