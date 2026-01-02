interface AuctionListHeaderProps {
  title?: string;
}

export default function AuctionListHeader({ title = "전체 경매 목록" }: AuctionListHeaderProps) {
  return (
    <div className="flex items-center justify-center p-3">
      <h2 className="text-2xl">{title}</h2>
    </div>
  );
}
