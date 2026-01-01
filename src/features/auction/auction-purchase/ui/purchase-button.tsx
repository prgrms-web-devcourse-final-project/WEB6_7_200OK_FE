"use client";

import type { AuctionStatusType } from "@/entities/auction";
import { Button } from "@/shared/ui";

const purchaseButtonLabel: Record<AuctionStatusType, string> = {
  PROCESS: "구매하기",
  CANCELED: "거래 취소된 상품입니다",
  FAILED: "거래 실패된 상품입니다",
  SCHEDULED: "경매 예정",
  COMPLETED: "거래 완료된 상품입니다",
};

export default function PurchaseButton({
  onClick,
  status,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  status: AuctionStatusType;
}) {
  return (
    <Button size="lg" className="h-14 flex-1" onClick={onClick} disabled={status !== "PROCESS"}>
      {purchaseButtonLabel[status]}
    </Button>
  );
}
