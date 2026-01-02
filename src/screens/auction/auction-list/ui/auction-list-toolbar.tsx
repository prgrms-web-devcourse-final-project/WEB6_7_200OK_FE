import {
  ArrowDownUp,
  CircleCheckBig,
  Clock,
  SlidersHorizontal,
  TextAlignJustify,
  Zap,
} from "lucide-react";

import { Button } from "@/shared/ui";
import { AuctionFiltersSheet } from "@/widgets/auction/auction-filters";

export default function AuctionListToolbar() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-2">
        <Button variant="brandOutline" className="rounded-full">
          <TextAlignJustify /> 전체
        </Button>
        <Button variant="brandOutline" className="rounded-full">
          <Zap /> 진행 중
        </Button>
        <Button variant="brandOutline" className="rounded-full">
          <Clock /> 예정
        </Button>
        <Button variant="brandOutline" className="rounded-full">
          <CircleCheckBig /> 종료
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="brandOutline">
          <ArrowDownUp /> 최신순
        </Button>
        <AuctionFiltersSheet
          trigger={
            <Button variant="brandOutline">
              <SlidersHorizontal /> 필터
            </Button>
          }
        />
        <Button variant="brandOutline" className="hidden lg:flex">
          <SlidersHorizontal /> 필터
        </Button>
      </div>
    </div>
  );
}
