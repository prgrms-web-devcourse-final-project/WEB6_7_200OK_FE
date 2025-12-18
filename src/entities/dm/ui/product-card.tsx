import Image from "next/image";

import SonySvg from "@/shared/assets/images/dm-images/sony.svg";

import type { Product } from "../model/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border-border rounded-md border p-4">
      <div className="flex gap-4">
        {/* TODO: 상품 이미지 표시 추후 작업 필요 */}
        <Image
          src={SonySvg}
          alt={product.name}
          width={112}
          height={112}
          className="h-28 w-28 shrink-0 rounded-md object-cover"
        />
        <div className="flex h-28 flex-1 flex-col justify-center">
          <p className="mb-3 font-medium">{product.name}</p>
          <div className="space-y-2">
            <p
              className="text-base dark:text-[oklch(0.65_0.2_145)]"
              style={{ color: "oklch(0.55 0.2 145)" }}
            >
              구매가: ₩{product.price.toLocaleString()}
            </p>
            <p className="text-foreground text-base">구매일: {product.purchaseDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
