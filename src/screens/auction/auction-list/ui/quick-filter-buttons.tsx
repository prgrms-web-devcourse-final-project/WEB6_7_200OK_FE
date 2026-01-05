import { CircleCheckBig, Clock, TextAlignJustify, Zap } from "lucide-react";

import { useAuctionFilters } from "@/features/auction/filters/model/use-auction-filters";
import { Button } from "@/shared/ui";

export default function QuickFilterButtons() {
  const { filters, setFilters } = useAuctionFilters();

  const isActive = (status?: string) => {
    if (!status) return !filters.status;

    return filters.status === status;
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={isActive() ? "primary" : "outline"}
        className="rounded-full"
        onClick={() => setFilters({ status: undefined })}
      >
        <TextAlignJustify /> 전체
      </Button>
      <Button
        variant={isActive("PROCESS") ? "primary" : "outline"}
        className="rounded-full"
        onClick={() => setFilters({ status: "PROCESS" })}
      >
        <Zap /> 진행 중
      </Button>
      <Button
        variant={isActive("SCHEDULED") ? "primary" : "outline"}
        className="rounded-full"
        onClick={() => setFilters({ status: "SCHEDULED" })}
      >
        <Clock /> 예정
      </Button>
      <Button
        variant={isActive("COMPLETED") ? "primary" : "outline"}
        className="rounded-full"
        onClick={() => setFilters({ status: "COMPLETED" })}
      >
        <CircleCheckBig /> 종료
      </Button>
    </div>
  );
}
