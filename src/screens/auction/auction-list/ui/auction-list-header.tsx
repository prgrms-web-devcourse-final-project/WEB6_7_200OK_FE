interface AuctionListHeaderProps {
  title?: string;
}

export default function AuctionListHeader({ title = "전체" }: AuctionListHeaderProps) {
  return (
    <div className="flex items-center justify-center p-3">
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}
