import { useQuery } from "@tanstack/react-query";

import { MOCK_WISHLIST_ITEMS, WishlistItemType } from "@/entities/item";

const fetchWishlist = async (): Promise<WishlistItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_WISHLIST_ITEMS), 500); // 서버 지연 테스트 0.5초
  });

export const wishlistKeys = {
  all: ["user", "wishlist"] as const,
};

export function useWishlist() {
  return useQuery({
    queryKey: wishlistKeys.all,
    queryFn: fetchWishlist,
  });
}
