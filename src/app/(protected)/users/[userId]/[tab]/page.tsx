import { getUserProfileServer } from "@/entities/user/api/user-api.server";
import { UserTabContent } from "@/screens/user";

interface PageProps {
  params: Promise<{
    userId: string;
    tab: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { userId, tab } = await params;
  const targetUserId = Number(userId);
  const profile = await getUserProfileServer(targetUserId);

  return <UserTabContent tabId={tab} targetUserId={targetUserId} initialData={profile} />;
}
