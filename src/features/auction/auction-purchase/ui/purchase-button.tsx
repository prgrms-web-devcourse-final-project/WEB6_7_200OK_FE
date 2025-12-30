"use client";

import { Button } from "@/shared/ui";

export default function PurchaseButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button size="lg" className="h-14 flex-1" onClick={onClick}>
      구매하기
    </Button>
  );
}
