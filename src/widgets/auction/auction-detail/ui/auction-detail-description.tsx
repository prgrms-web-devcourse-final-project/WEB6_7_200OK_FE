interface AuctionDetailDescriptionProps {
  description?: string | null;
}

export default function AuctionDetailDescription({ description }: AuctionDetailDescriptionProps) {
  const normalizedText = (description ?? "")
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .trim();

  if (!normalizedText) {
    return (
      <div className="flex flex-col gap-2">
        <h3 className="text-foreground text-lg font-semibold">상품 정보</h3>
        <p className="text-muted-foreground text-base">상품 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-foreground text-lg font-semibold">상품 정보</h3>
      <p className="text-foreground text-base whitespace-pre-line">{normalizedText}</p>
    </div>
  );
}
