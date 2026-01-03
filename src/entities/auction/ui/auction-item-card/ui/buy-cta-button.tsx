import Link from "next/link";

import { ShoppingBag } from "lucide-react";

import Button from "@/shared/ui/button/button";

export default function BuyCtaButton({ href }: { href: string }) {
  return (
    <Button size="lg" className="w-full font-semibold" aria-label="경매 상품 구매하기" asChild>
      <Link href={href}>
        <ShoppingBag className="size-4" aria-hidden="true" />
        구매하기
      </Link>
    </Button>
  );
}
