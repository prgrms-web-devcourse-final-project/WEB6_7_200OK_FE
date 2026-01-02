"use client";

import type { AuctionStatusType } from "@/entities/auction";
import { useTossPayments } from "@/features/auction/auction-purchase/hook/use-toss-payments";
import { PURCHASE_BUTTON_LABEL } from "@/features/auction/auction-purchase/model/constants";
import { Button } from "@/shared/ui";

export default function PurchaseButton({
  status,
  auctionId,
  title,
  userName,
}: {
  status: AuctionStatusType;
  auctionId: string;
  title: string;
  userName: string;
}) {
  const { requestPayment } = useTossPayments(auctionId, title, userName);
  return (
    <Button
      size="lg"
      className="h-14 flex-1"
      onClick={() => requestPayment()}
      disabled={status !== "PROCESS"}
    >
      {PURCHASE_BUTTON_LABEL[status]}
    </Button>
  );
}
