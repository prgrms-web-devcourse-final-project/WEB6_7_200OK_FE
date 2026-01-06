import { CATEGORY_LABEL, type ItemCategory } from "@/entities/auction";
import { AvatarFallback, Avatar, AvatarImage } from "@/shared/ui";

export default function AuctionDetailThumbnail({
  title,
  category,
  thumbnail,
}: {
  title: string;
  category: ItemCategory;
  thumbnail: string;
}) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-12 w-12 rounded-sm border">
        <AvatarImage src={thumbnail} className="rounded-sm" />
        <AvatarFallback className="rounded-sm">{title}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center gap-1">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-muted-foreground text-sm">#{CATEGORY_LABEL[category]}</span>
      </div>
    </div>
  );
}
