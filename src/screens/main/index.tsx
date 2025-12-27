import { Auctions } from "@/screens/main/ui/auctions";
import { HeroSection } from "@/widgets/hero-section";

export default async function MainScreen() {
  return (
    <>
      <HeroSection />
      <Auctions />
    </>
  );
}
