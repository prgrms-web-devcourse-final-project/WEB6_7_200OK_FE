import { getHomeAuctions } from "@/screens/home/api/getHomeActions";
import HomeMain from "@/screens/home/ui/home-main";

export default async function HomeScreen() {
  const data = await getHomeAuctions();

  return <HomeMain data={data} />;
}
