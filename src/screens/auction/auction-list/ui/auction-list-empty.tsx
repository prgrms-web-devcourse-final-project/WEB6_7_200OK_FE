import { EmptyState, type EmptyStateProps } from "@/shared/ui";

export default function AuctionListEmpty({ title, description, Icon }: EmptyStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      Icon={Icon}
      className="border-none"
      size="lg"
    />
  );
}
