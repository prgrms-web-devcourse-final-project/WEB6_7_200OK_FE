import { cn } from "@/shared/lib/utils/utils";
import { Skeleton } from "@/shared/ui";

interface AuctionItemCardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className }: AuctionItemCardSkeletonProps) {
  return (
    <article
      className={cn(
        "bg-card h-fit w-full overflow-hidden rounded-xl border select-none",
        className
      )}
      aria-busy="true"
    >
      <div className="aspect-square">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-3/3" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </article>
  );
}
