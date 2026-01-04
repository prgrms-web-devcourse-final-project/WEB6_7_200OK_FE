const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sellerInfoQuery = (sellerId: number) => ({
  queryKey: ["sellerInfo", sellerId] as const,
  queryFn: async () => {
    const res = await fetch(`${API_URL}/api/v1/users/${sellerId}/sales`);
    if (!res.ok) throw new Error("Failed to fetch sellerInfo");
    return res.json();
  },
  staleTime: 60_000,
});
