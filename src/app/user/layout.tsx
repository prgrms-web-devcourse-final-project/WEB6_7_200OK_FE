// app/user/layout.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { fetchUserBasicInfoServer } from "@/entities/user/api/user-api.server";
import { userKeys } from "@/features/user/api/use-my-profile";
import { UserDashboardHeader } from "@/widgets/user";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: userKeys.me(),
    queryFn: fetchUserBasicInfoServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 2xl:px-0">
        <UserDashboardHeader />
        <div className="w-full">{children}</div>
      </main>
    </HydrationBoundary>
  );
}
