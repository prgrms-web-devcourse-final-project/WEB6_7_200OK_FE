import { UserTabContent } from "@/screens/user";

interface PageProps {
  params: Promise<{
    userId: string;
    tab: string;
  }>;
}

export default async function UserTabPage({ params }: PageProps) {
  const { userId, tab } = await params;

  const targetUserId = Number(userId);

  return <UserTabContent tabId={tab} targetUserId={targetUserId} />;
}
