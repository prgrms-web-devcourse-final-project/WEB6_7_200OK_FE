"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToastRegistry() {
  const { theme = "system" } = useTheme();

  return <Toaster position="top-center" theme={theme as "light" | "dark" | "system"} />;
}
