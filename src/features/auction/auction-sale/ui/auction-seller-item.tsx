import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/shared/config/routes";

interface AuctionSellerItemProps {
  auctionId: number;
  title: string;
  imageUrl: string;
}

export default function AuctionSellerItem({ auctionId, imageUrl, title }: AuctionSellerItemProps) {
  return (
    <article className="bg-card h-fit w-full overflow-hidden rounded-xl border select-none">
      <Link href={ROUTES.auctionDetail(auctionId)}>
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt="판매자가 판매 중인 추천 아이템"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 p-4">
          <h3 className="truncate font-medium">{title}</h3>
        </div>
      </Link>
    </article>
  );
}
