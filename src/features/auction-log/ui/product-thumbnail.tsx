export default function ProductThumbnail() {
  // TODO: Avatar 컴포넌트 들어갈 예정
  return (
    <div className="flex gap-3">
      <div className="h-12 w-12 rounded-lg border" />
      <div className="flex flex-col justify-center gap-1">
        <h3 className="text-sm font-medium">제품 이름</h3>
        <span className="text-muted-foreground text-sm">#카테고리</span>
      </div>
    </div>
  );
}
