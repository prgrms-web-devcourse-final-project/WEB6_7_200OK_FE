import { getAuctions } from "@/screens/auction/auction-list/api/getAuctions";
import { AuctionListGrid } from "@/widgets/auction-list-grid";

export default async function AuctionList() {
  const data = await getAuctions();

  return <AuctionListGrid items={data.slice} />;
}
