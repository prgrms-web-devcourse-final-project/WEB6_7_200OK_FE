"use client";

import { Eye } from "lucide-react";

import { useAuctionViewer } from "@/features/auction/auction-log/provider/use-auction-viewer";

export default function AuctionViewerLogBadge() {
  const viewerCount = useAuctionViewer((state) => state.viewerCount);
  return (
    <div
      aria-label="경매 상세 시청자 수"
      className="inline-flex h-6 items-center gap-2 rounded-full bg-linear-to-r from-zinc-600 to-zinc-700 px-3 py-1 text-xs leading-none font-bold text-zinc-50"
    >
      <Eye className="size-3.5 shrink-0" />
      <span className="leading-none">{viewerCount}</span>
    </div>
  );
}
