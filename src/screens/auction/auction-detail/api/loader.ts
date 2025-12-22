import { AuctionDetailType } from "@/screens/auction/auction-detail/model/types";
import { fetch } from "@/shared/api/server";

export const auctionDetailLoader = async (auctionId: string) => {
  const res = await fetch<AuctionDetailType>(`/api/v1/auctions/${auctionId}`);

  // TODO: case handling
  return res;
};
