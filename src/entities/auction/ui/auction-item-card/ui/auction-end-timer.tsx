import { CircleCheck } from "lucide-react";

export default function AuctionEndTimer() {
  return (
    <div
      className="bg-muted flex h-11 w-full items-center gap-1.5 rounded-md p-3 text-sm"
      role="group"
      aria-label="낙찰"
    >
      <CircleCheck aria-hidden className="size-4" />
      <span>낙찰</span>
      <span className="text-destructive ml-auto font-semibold whitespace-nowrap">마감</span>
    </div>
  );
}
