import { Progress } from "@/shared/ui/progress/progress";

export function AuctionProgress() {
  // TODO: timeout end trigger
  // TODO: timeout get default time
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-normal">다음 가격 하락까지</h3>
        <time className="text-2xl font-medium">4:46</time>
      </div>
      <Progress value={30} indicatorClassName="bg-brand" />
    </div>
  );
}
