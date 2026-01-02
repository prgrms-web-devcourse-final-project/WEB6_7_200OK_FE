import AuctionListScreen from "@/screens/auction/auction-list";
import { parseParams } from "@/screens/auction/auction-list/model/parse-params";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const parsedParams = parseParams(params);

  return <AuctionListScreen params={parsedParams} />;
}
