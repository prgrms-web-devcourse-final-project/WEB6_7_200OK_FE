import { use } from "react";

import { UserTabContent } from "@/screens/user";

export default function UserTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = use(params);

  return <UserTabContent tabId={tab} />;
}
