import { Progress } from "@/shared/ui/progress/progress";

export default function ProductProgress() {
  // TODO: timeout end trigger
  // TODO: timeout get default time
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-normal">다음 가격 하락까지</h3>
        <span className="text-2xl font-medium">4:46</span>
      </div>
      <Progress value={30} indicatorClassName="bg-brand" />
    </div>
  );
}
