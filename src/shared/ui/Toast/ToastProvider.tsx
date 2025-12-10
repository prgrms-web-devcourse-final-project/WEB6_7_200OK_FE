"use client";

import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from "react";

import { toast, Toaster } from "sonner";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

interface ToastContextType {
  addToast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast 타입별 색상 매핑, info brand 컬러의 다크모드용 색상 추가 필요
const TOAST_COLORS = {
  info: "!text-[var(--color-brand)] dark:!text-[var(--color-brand)]",
  success: "!text-emerald-600 dark:!text-emerald-400",
  warning: "!text-amber-600 dark:!text-amber-400",
  error: "!text-red-600 dark:!text-red-400",
} as const;

export const Toast = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    // MutationObserver로 사이트 테마 변경 감지
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });

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

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const addToast = useCallback(({ message, type = "error" }: ToastProps) => {
    const toastFunction = toast[type];
    toastFunction(message, {
      className: TOAST_COLORS[type],
    });
  }, []);

  const contextValue = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      <Toast />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
