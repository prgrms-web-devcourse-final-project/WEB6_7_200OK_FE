"use client";

import { useEffect, useState } from "react";

import { toast, Toaster } from "sonner";

// toast 색상 매핑
const TOAST_COLORS = {
  info: "!text-[var(--color-brand)] dark:!text-[var(--color-brand)]",
  success: "!text-emerald-600 dark:!text-emerald-400",
  warning: "!text-amber-600 dark:!text-amber-400",
  error: "!text-red-600 dark:!text-red-400",
} as const;

export const ToastRegistry = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    updateTheme();

    // 테마 변경 감지 (MutationObserver)
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Toaster
      position="top-center"
      theme={theme}
      duration={3000}
      toastOptions={{
        classNames: {
          toast: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
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
