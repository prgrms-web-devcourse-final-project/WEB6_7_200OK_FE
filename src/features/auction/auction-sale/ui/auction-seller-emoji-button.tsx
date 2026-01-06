"use client";

import { useState } from "react";

import useAuctionSellerSocket from "@/features/auction/auction-sale/hook/use-auction-seller-socket";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@/shared/ui";

interface AuctionSellerEmojiButtonProps {
  token?: string;
  auctionId: string | number;
}

export default function AuctionSellerEmojiButton({
  auctionId,
  token,
}: AuctionSellerEmojiButtonProps) {
  const { handleSendEmoji } = useAuctionSellerSocket(auctionId, token);
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    if (!token) return showToast.error("알 수 없는 이유로 실행할 수 없습니다.");
    setOpen((prev) => !prev);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="primary" className="flex-1" size="lg">
          감정 보내기
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Button onClick={() => handleSendEmoji("LIKE")}>좋아요</Button>
          <Button onClick={() => handleSendEmoji("FIRE")}>화력</Button>
          <Button onClick={() => handleSendEmoji("SAD")}>슬퍼요</Button>
          <Button onClick={() => handleSendEmoji("SMILE")}>행복해요</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
