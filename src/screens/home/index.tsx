import { HomeAuctionsData } from "@/screens/home/model/types";
import HomeMain from "@/screens/home/ui/home-main";
import { fetch } from "@/shared/api/server";

export default async function HomeScreen() {
  const response = await fetch<HomeAuctionsData>("/api/v1/auctions");

  return <HomeMain data={response.data} />;
}
