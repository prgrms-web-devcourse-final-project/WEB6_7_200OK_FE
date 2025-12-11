"use client";

import { ErrorScreen } from "@/screens/error";

export default function ErrorPage({ error }: { error: Error }) {
  return <ErrorScreen error={error} />;
}
