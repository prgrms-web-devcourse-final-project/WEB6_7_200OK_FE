"use client";

import { useMutation } from "@tanstack/react-query";

import type { AuctionStatusType } from "@/entities/auction";
import { getUserBasic } from "@/entities/user/api/user-api";
import { useTossPayments } from "@/features/auction/auction-purchase/hook/use-toss-payments";
import { PURCHASE_BUTTON_LABEL } from "@/features/auction/auction-purchase/model/constants";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { Button } from "@/shared/ui";

export default function PurchaseButton({
  status,
  auctionId,
  title,
}: {
  status: AuctionStatusType;
  auctionId: string;
  title: string;
}) {
  const { requestPayment } = useTossPayments();
  const { mutate, isPending } = useMutation({
    mutationFn: getUserBasic,
    onSuccess: (data) => {
      requestPayment(auctionId, title, data.username);
    },
    onError: () => {
      showToast.error("로그인 후 이용해 주세요");
    },
  });
  return (
    <Button
      size="lg"
      className="h-14 flex-1"
      onClick={() => mutate()}
      disabled={status !== "PROCESS" || isPending}
    >
      {PURCHASE_BUTTON_LABEL[status]}
    </Button>
  );
}
