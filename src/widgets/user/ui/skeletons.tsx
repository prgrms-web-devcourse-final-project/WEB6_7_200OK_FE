import { Skeleton } from "@/shared/ui";

interface ChildrenProps {
  children: React.ReactNode;
}

const createKeys = (prefix: string, count: number) =>
  Array.from({ length: count }, (_unused, i) => `${prefix}-${i}`);

// Calendar skeleton keys are fixed-size, so we can keep them module-scoped.
const WEEKDAY_KEYS = createKeys("weekday", 7);
const WEEK_ROW_KEYS = createKeys("week-row", 5);
const WEEK_COL_KEYS = createKeys("week-col", 7);

// --- Base Layout Skeleton ---
export function DashboardSkeletonLayout({ children }: ChildrenProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
      {children}
    </div>
  );
}

// --- Item Card List (판매, 구매, 관심, 최근, 알림) 기본 로딩 ---
export function CommonItemListSkeleton({ count = 5 }: { count?: number }) {
  const keys = createKeys("common-item", count);

  return (
    <div className="flex flex-col gap-4">
      {keys.map((key) => (
        <div
          key={key}
          className="bg-card border-border flex w-full items-start gap-3 rounded-lg border p-4"
        >
          <Skeleton className="size-28 shrink-0 rounded-lg" />

          <div className="flex h-28 flex-1 flex-col justify-between py-0.5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="size-5 rounded-full" />
              </div>

              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-1 h-6 w-1/3" />
              </div>
            </div>

            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 탭 로딩용 (UserTabContent)
export function CommonItemTabSkeleton() {
  return (
    <DashboardSkeletonLayout>
      <CommonItemListSkeleton />
    </DashboardSkeletonLayout>
  );
}

// --- Review List ---
export function ReviewItemListSkeleton() {
  const keys = createKeys("review-item", 5);

  return (
    <div className="flex flex-col gap-4">
      {keys.map((key) => (
        <div
          key={key}
          className="bg-card border-border flex w-full flex-col gap-3 rounded-2xl border p-4"
        >
          <div className="flex items-start gap-3">
            <Skeleton className="size-12 shrink-0 rounded-full" />
            <div className="flex flex-col gap-1 pt-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="mt-1 flex w-full items-center gap-3 rounded-xl p-3">
            <Skeleton className="size-16 shrink-0 rounded-xl" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ReviewTabSkeleton() {
  return (
    <DashboardSkeletonLayout>
      <ReviewItemListSkeleton />
    </DashboardSkeletonLayout>
  );
}

// --- Calendar Tab ---
export function CalendarTabSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
      {/* DailyAuctionCalendar */}
      <div className="bg-card border-border flex w-full flex-col gap-4 rounded-lg border p-6 shadow-sm lg:w-1/2">
        <div className="flex h-7 items-center justify-between px-0.5 pb-6">
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-1">
            <Skeleton className="size-7 rounded-lg" />
            <Skeleton className="size-7 rounded-lg" />
          </div>
        </div>

        <div className="flex h-102 flex-col justify-around gap-2">
          {/* Weekday Headers */}
          <div className="flex justify-between px-2 pb-2">
            {WEEKDAY_KEYS.map((key) => (
              <Skeleton key={key} className="h-4 w-6" />
            ))}
          </div>

          {/* Date Cells (Grid) - 5주 정도 표시 */}
          {WEEK_ROW_KEYS.map((rowKey) => (
            <div key={rowKey} className="flex justify-between px-2">
              {WEEK_COL_KEYS.map((colKey) => (
                <Skeleton key={`${rowKey}-${colKey}`} className="size-8 rounded-full opacity-20" />
              ))}
            </div>
          ))}
        </div>

        {/* Footer: Selected Date Box */}
        <div className="border-border bg-secondary/30 flex w-full flex-col gap-3 rounded-lg border px-3 py-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>

      {/* DailyAuctionList */}
      <div className="bg-card border-border flex w-full flex-col gap-4 rounded-lg border p-6 shadow-sm lg:w-1/2">
        <div className="flex h-7 flex-row items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-10 rounded-lg" />
            <Skeleton className="h-7 w-10 rounded-lg" />
            <Skeleton className="h-7 w-12 rounded-lg" />
          </div>
        </div>

        <CommonItemListSkeleton count={3} />
      </div>
    </div>
  );
}
