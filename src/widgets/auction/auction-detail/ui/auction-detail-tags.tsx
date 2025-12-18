export default function AuctionDetailTags() {
  return (
    <div className="flex flex-wrap items-center">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((tag, idx, arr) => (
        <span key={tag} className="inline-flex items-center">
          <span className="text-muted-foreground text-base whitespace-nowrap">#태그{tag}</span>
          {idx !== arr.length - 1 && <span className="text-muted-foreground mx-1">·</span>}
        </span>
      ))}
    </div>
  );
}
