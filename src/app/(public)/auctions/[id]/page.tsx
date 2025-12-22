import { AuctionDetailScreen } from "@/screens/auction/auction-detail";
import { auctionDetailLoader } from "@/screens/auction/auction-detail/api/loader";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await auctionDetailLoader(id);
  return <AuctionDetailScreen data={data} />;
}
