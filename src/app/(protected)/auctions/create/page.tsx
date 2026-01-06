import { Suspense } from "react";

import { AuctionCreateScreen } from "@/screens/auction/auction-create";

export default function Page() {
  return (
    <Suspense>
      <AuctionCreateScreen />
    </Suspense>
  );
}
