import { VARIANT_CONFIG } from "@/entities/auction/ui/auction-item-card/model/constants";
import { type AuctionCardVariantType } from "@/entities/auction/ui/auction-item-card/model/types";
import { cn } from "@/shared/lib/utils/utils";
import { Skeleton } from "@/shared/ui";

interface AuctionItemCardSkeletonProps {
  variant: AuctionCardVariantType;
  className?: string;
}

export function CardSkeleton({ variant, className }: AuctionItemCardSkeletonProps) {
  const { content, timer, cta } = VARIANT_CONFIG[variant];

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

        {content && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}

        {timer && <Skeleton className="h-11 w-full" />}
      </div>

      {cta && (
        <div className="w-full px-4 pb-4">
          <Skeleton className="h-11 w-full" />
        </div>
      )}
    </article>
  );
}
