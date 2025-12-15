interface ProductInfoProps {
  text: string;
}

export default function ProductInfo({ text }: ProductInfoProps) {
  const normalizedText = text.replace(/\\n/g, "\n");
  return (
    <div className="flex flex-col gap-2">
      <p className="font-lg text-foreground font-semibold">상품 정보</p>
      <p className="font-base text-foreground whitespace-pre-line">{normalizedText}</p>
    </div>
  );
}
