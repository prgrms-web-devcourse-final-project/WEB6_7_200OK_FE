"use client";

import { useTheme } from "next-themes";
import { toast, Toaster } from "sonner";

const TOAST_COLORS = {
  info: "!text-[var(--color-brand)] dark:!text-[var(--color-brand-dark)]",
  success: "!text-emerald-600 dark:!text-emerald-400",
  warning: "!text-amber-600 dark:!text-amber-400",
  error: "!text-red-600 dark:!text-red-400",
} as const;

export const ToastRegistry = () => {
  const { theme = "system" } = useTheme();

  return (
    <Toaster
      position="top-center"
      theme={theme as "light" | "dark" | "system"}
      duration={3000}
      toastOptions={{
        classNames: {
          toast: "bg-card dark:bg-card border border-border shadow-lg",
        },
      }}
    />
  );
};

// useToast 훅 대신 직접 toast를 호출하는 유틸리티 객체
export const showToast = {
  success: (message: string) => toast.success(message, { className: TOAST_COLORS.success }),

  error: (message: string) => toast.error(message, { className: TOAST_COLORS.error }),

  warning: (message: string) => toast.warning(message, { className: TOAST_COLORS.warning }),

  info: (message: string) => toast.info(message, { className: TOAST_COLORS.info }),
};
