import { Separator, Skeleton } from "@/shared/ui";

export default function AuctionDetailLoadingScreen() {
  return (
    <div className="h-[calc(100vh-var(--header-h))] lg:h-[calc(100vh-var(--header-h))]">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row">
        {/* Left Section */}
        <div className="lg:min-w-125 lg:shrink lg:grow-0 lg:basis-189">
          <div className="flex flex-col gap-8 p-4">
            <Skeleton className="hidden h-162 w-full lg:block" />
            <Separator />
            <Skeleton className="h-15" />
            <Separator />
            <Skeleton className="h-75" />
          </div>
        </div>

        {/* Divider */}
        <Separator orientation="vertical" />

        {/* Right Section */}
        <div className="overflow-y-auto lg:sticky lg:top-0 lg:max-h-[calc(100vh-var(--header-h))] lg:min-w-131 lg:shrink-0 lg:grow-0 lg:basis-131">
          <div className="flex flex-col gap-8 p-4">
            <Skeleton className="block h-162 w-full lg:hidden" />
            <Skeleton className="h-6" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-8" />
            <Skeleton className="h-6" />
            <Skeleton className="h-7" />
            <Skeleton className="h-7" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Skeleton className="h-14 w-10" />
                <Skeleton className="h-14 w-10" />
              </div>
              <Skeleton className="h-14 flex-1" />
            </div>
            <Skeleton className="h-61" />
          </div>
        </div>
      </div>
    </div>
  );
}
