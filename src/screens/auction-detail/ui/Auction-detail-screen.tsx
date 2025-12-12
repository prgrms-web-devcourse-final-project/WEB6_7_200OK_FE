import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area/scroll-area";
import { Separator } from "@/shared/ui/seperator/separator";

export default function AuctionDetailScreen() {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row">
        {/* Left Section */}
        <div className="lg:min-w-32.75 lg:basis-3xl" />

        {/* Divider */}
        <Separator orientation="vertical" />

        {/* Right Section */}
        <div className="overflow-y-auto lg:sticky lg:top-0 lg:max-h-[calc(100vh-120px)] lg:min-w-30 lg:basis-131" />
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
