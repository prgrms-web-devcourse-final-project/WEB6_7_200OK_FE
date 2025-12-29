import { chatRoomsLoader } from "@/features/chat";
import { ChatListScreen } from "@/screens/chat";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ scope?: "ALL" | "BUY" | "SELL" }>;
}) {
  const { scope } = await searchParams;
  const data = await chatRoomsLoader(scope ? { scope } : undefined);
  return <ChatListScreen initialData={data} />;
}
