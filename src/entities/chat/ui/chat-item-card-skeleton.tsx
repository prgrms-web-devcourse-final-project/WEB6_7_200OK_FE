import { Skeleton } from "@/shared/ui/skeleton/skeleton";

export function ChatItemCardSkeleton() {
  return (
    <div className="p-4">
      <div className="flex gap-4">
        {/* 이미지 */}
        <Skeleton className="h-28 w-28 shrink-0 rounded-md" />

        <div className="flex h-28 flex-1 flex-col justify-center gap-3">
          {/* 상품명 */}
          <Skeleton className="h-5 w-2/5" />

          <div className="space-y-2">
            {/* 가격 */}
            <Skeleton className="h-5 w-2/6" />
            {/* 날짜 */}
            <Skeleton className="h-5 w-2/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
