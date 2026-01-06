import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { ListFilter } from "@/features/chat";
import { chatRoomsLoader } from "@/features/chat/api/loader";
import { ChatListScreen } from "@/screens/chat";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ scope?: ListFilter }>;
}) {
  const { scope } = await searchParams;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/auth/login");
  }

  if (!scope) {
    redirect("/dm?scope=ALL");
  }

  const data = await chatRoomsLoader({
    scope,
    accessToken,
  });

  return <ChatListScreen initialData={data || []} accessToken={accessToken} />;
}
