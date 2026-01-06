import { CardSkeleton } from "@/entities/auction/ui/auction-item-card/ui/card-skeleton";

export function AuctionGridSkeleton() {
  return (
    <section className="w-full">
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i}>
            <CardSkeleton variant="live" />
          </li>
        ))}
      </ul>
    </section>
  );
}
