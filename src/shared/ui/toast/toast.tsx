"use client";

import { cva } from "class-variance-authority";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";

export function ToastRegistry() {
  const { theme = "system" } = useTheme();

  return <Toaster position="top-center" theme={theme as "light" | "dark" | "system"} />;
}

const toastVariants = cva("", {
  variants: {
    type: {
      success: "!text-emerald-600 dark:!text-emerald-400",
      error: "!text-red-600 dark:!text-red-400",
      warning: "!text-amber-600 dark:!text-amber-400",
      info: "!text-brand dark:!text-brand",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

interface ToastOptions {
  duration?: number;
}

type ToastType = "success" | "error" | "warning" | "info";

const createToast = (type: ToastType) => (message: string, options?: ToastOptions) =>
  toast[type](message, {
    className: toastVariants({ type }),
    duration: options?.duration,
  });

export const showToast = {
  success: createToast("success"),
  error: createToast("error"),
  warning: createToast("warning"),
  info: createToast("info"),
};
