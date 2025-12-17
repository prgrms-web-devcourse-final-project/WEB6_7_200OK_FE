import type { AuctionDetailType } from "@/screens/auction-detail/model/type";

export const AUCTION_DETAIL_MOCKDATA: AuctionDetailType = {
  auctionId: 123,
  title: "IPHONE SE6 gray",
  isLiked: true,
  startedAt: "2025-12-17T03:28:07.448Z",
  startPrice: 30000,
  currentPrice: 27000,
  discountRate: 1000,
  imageUrls: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400",
    "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400",
  ],
  stopLoss: 10000,
  description: "아이폰 SE6 판매 \n 초S급",
  category: "clothing",
  likeCount: 100,
  viewerCount: 200,
  status: "PROCESS",
  seller: {
    sellerId: 1,
    nickname: "김판매",
    profileImageUrl: "src",
    rating: 3.8,
    reviewCount: 127,
  },
  recentPriceHistory: [
    {
      historyId: 1,
      currentPrice: 29000,
      viewerCount: 120,
      createdAt: "2025-12-17T03:28:07.448Z",
    },
    {
      historyId: 1,
      currentPrice: 28000,
      viewerCount: 120,
      createdAt: "2025-12-17T03:28:07.448Z",
    },
  ],
};
