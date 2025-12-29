import Image from "next/image";

import type { ChatRoomAuction } from "@/features/chat";

interface ChatItemCardProps {
  auction: ChatRoomAuction;
}

export function ChatItemCard({ auction }: ChatItemCardProps) {
  return (
    <div className="border-border rounded-md border p-4">
      <div className="flex gap-4">
        {/* TODO: 상품 이미지 표시 추후 작업 필요 */}
        <Image
          src={auction.imageUrl}
          alt={auction.title}
          width={112}
          height={112}
          className="h-28 w-28 shrink-0 rounded-md object-cover"
        />
        <div className="flex h-28 flex-1 flex-col justify-center">
          <p className="mb-3 font-medium">{auction.title}</p>
          <div className="space-y-2">
            <p
              className="text-base dark:text-[oklch(0.65_0.2_145)]"
              style={{ color: "oklch(0.55 0.2 145)" }}
            >
              구매가: ₩280,000
            </p>
            <p className="text-foreground text-base">구매일: 2024.11.30</p>
          </div>
        </div>
      </div>
    </div>
  );
}
