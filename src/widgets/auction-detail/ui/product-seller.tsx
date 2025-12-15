import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar/avatar";
import { Rating, RatingButton } from "@/shared/ui/rating/rating";

export default function ProductSeller() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Avatar className="size-6 rounded-sm">
          <AvatarImage />
          <AvatarFallback className="rounded-sm">김</AvatarFallback>
        </Avatar>
        <span className="text-lg">김판매</span>
      </div>

      <div className="flex items-center gap-1">
        <Rating defaultValue={1}>
          <RatingButton className="text-brand" size={24} />
        </Rating>
        <span className="text-lg">4.8</span>
      </div>

      <span className="text-muted-foreground cursor-pointer text-lg underline">리뷰 {348}</span>
    </div>
  );
}
