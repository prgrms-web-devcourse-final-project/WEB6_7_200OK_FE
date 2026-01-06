import { CATEGORY_LABEL, type ItemCategory } from "@/entities/auction";

export default function AuctionDetailCategory({ category }: { category: ItemCategory }) {
  return <span className="text-muted-foreground text-base">#{CATEGORY_LABEL[category]}</span>;
}
