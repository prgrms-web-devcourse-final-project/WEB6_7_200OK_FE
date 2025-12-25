import { useQuery } from "@tanstack/react-query";

import { MOCK_WISHLIST_ITEMS, WishlistItemType } from "@/entities/item";

// TODO: 실제 API 엔드포인트가 나오면 교체
const fetchWishlist = async (): Promise<WishlistItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_WISHLIST_ITEMS), 500);
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
