"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { searchAuctionsQuery } from "@/screens/auction/auction-list/model/search-auctions-query";
import { AuctionListParams } from "@/screens/auction/auction-list/model/types";
import { AuctionGrid } from "@/widgets/auction/auction-grid";

interface AuctionListProps {
  params: AuctionListParams;
}

export default function AuctionList({ params }: AuctionListProps) {
  const { data, status } = useInfiniteQuery(searchAuctionsQuery(params));

  if (status === "pending") {
    return <div>로딩 중...</div>;
  }

  if (status === "error") {
    return <div>에러 발생</div>;
  }

  const items = data.pages.flatMap((page) => page.slice);

  return <AuctionGrid items={items} />;
}
