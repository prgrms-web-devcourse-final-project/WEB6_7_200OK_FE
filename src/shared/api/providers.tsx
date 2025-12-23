"use client";

import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "./query-client";

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
