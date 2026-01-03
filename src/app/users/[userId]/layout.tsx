import { notFound } from "next/navigation";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getUserProfileServer } from "@/entities/user/api/user-api.server";
import { userKeys } from "@/features/user/api/use-my-profile";
import { UserDashboardHeader } from "@/widgets/user";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}

export default async function UserLayout({ children, params }: LayoutProps) {
  const { userId } = await params;

  const targetUserId = Number(userId);

  if (Number.isNaN(targetUserId)) {
    notFound();
  }

  const queryClient = new QueryClient();

  const profile = await getUserProfileServer(targetUserId);

  if (!profile) notFound();

  await queryClient.setQueryData(userKeys.profile(targetUserId), profile);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 2xl:px-0">
        <UserDashboardHeader targetUserId={targetUserId} />
        <div className="w-full">{children}</div>
      </main>
    </HydrationBoundary>
  );
}
