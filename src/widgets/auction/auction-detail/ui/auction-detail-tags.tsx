import { useId } from "react";

export default function AuctionDetailTags({ tags }: { tags: string[] }) {
  const id = useId();
  return (
    <div className="flex flex-wrap items-center">
      {tags.map((tag, idx, arr) => (
        <span key={`${id}:${tag}`} className="inline-flex items-center">
          <span className="text-muted-foreground text-base whitespace-nowrap">#태그{tag}</span>
          {idx !== arr.length - 1 && <span className="text-muted-foreground mx-1">·</span>}
        </span>
      ))}
    </div>
  );
}
