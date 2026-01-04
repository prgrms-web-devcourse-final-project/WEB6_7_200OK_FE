import { redirect } from "next/navigation";

import { getUserProfileServer } from "@/entities/user/api/user-api.server";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserPage({ params }: PageProps) {
  const { userId } = await params;
  const targetUserId = Number(userId);

  if (Number.isNaN(targetUserId)) {
    redirect("/");
  }

  const profile = await getUserProfileServer(targetUserId);

  if (!profile) {
    redirect("/");
  }

  if (profile.isOwner) {
    redirect(`/users/me/calendar`);
  } else {
    redirect(`/users/${targetUserId}/sales`);
  }
}
