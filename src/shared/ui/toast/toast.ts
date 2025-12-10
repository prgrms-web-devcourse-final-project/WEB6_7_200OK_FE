import { cva } from "class-variance-authority";
import { toast } from "sonner";

const toastVariants = cva("", {
  variants: {
    type: {
      success: "!text-emerald-600 dark:!text-emerald-400",
      error: "!text-red-600 dark:!text-red-400",
      warning: "!text-amber-600 dark:!text-amber-400",
      info: "!text-[var(--color-brand)] dark:!text-[var(--color-brand)]",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

interface ToastOptions {
  duration?: number;
}

const showToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      className: toastVariants({ type: "success" }),
      duration: options?.duration,
    }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, {
      className: toastVariants({ type: "error" }),
      duration: options?.duration,
    }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, {
      className: toastVariants({ type: "warning" }),
      duration: options?.duration,
    }),

  info: (message: string, options?: ToastOptions) =>
    toast.info(message, {
      className: toastVariants({ type: "info" }),
      duration: options?.duration,
    }),
};

export default showToast;
