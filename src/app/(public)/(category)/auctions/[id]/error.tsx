"use client";

import AuctionDetailErrorScreen from "@/screens/auction/auction-detail/ui/auction-detail-error-screen";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ErrorPage({ error }: { error: Error }) {
  return (
    <AuctionDetailErrorScreen
      title="경매를 찾을 수 없습니다"
      description="요청하신 경매에 대한 정보를 찾을 수 없어요"
    />
  );
}
