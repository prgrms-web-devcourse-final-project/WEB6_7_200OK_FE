"use client";

import { Toaster } from "sonner";

export default function ToastRegistry() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast: "bg-card dark:bg-card border border-border shadow-lg",
        },
      }}
    />
  );
}
