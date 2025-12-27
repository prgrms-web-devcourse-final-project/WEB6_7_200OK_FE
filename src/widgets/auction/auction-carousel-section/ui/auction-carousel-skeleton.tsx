import { Skeleton } from "@/shared/ui";

export default function AuctionCarouselSkeleton() {
  return (
    <div className="flex w-full gap-4 overflow-hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="shrink-0 basis-[70%] sm:basis-1/2 md:basis-2/5 lg:basis-1/3 xl:basis-1/4"
        >
          <div className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
