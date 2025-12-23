import { ReactNode } from "react";

import { Container } from "@/shared/ui";
import { AuctionFilterSheet, AuctionFiltersSidebar } from "@/widgets/auction/auction-filters";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Container>
        <AuctionFilterSheet />
        <AuctionFiltersSidebar />
        {children}
      </Container>
    </div>
  );
}
