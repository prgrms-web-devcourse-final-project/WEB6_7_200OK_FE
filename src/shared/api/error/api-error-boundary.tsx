"use client";

import { Component, type ReactNode } from "react";

import { TriangleAlert } from "lucide-react";

import { EmptyState } from "@/shared/ui";

interface Props {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  className?: string;
  onError?: (error: unknown) => void;
}

interface State {
  error: unknown | null;
  shouldHandleError: boolean;
  shouldRethrow: boolean;
}

function isCodeError(
  error: unknown
): error is { code: string; message?: string; displayMessage?: string } {
  return (
    typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
  );
}

export class ApiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      shouldHandleError: false,
      shouldRethrow: false,
    };
  }

  static getDerivedStateFromError(error: unknown): Partial<State> {
    if (!isCodeError(error)) {
      return { error, shouldHandleError: false, shouldRethrow: true };
    }

    if (error.code === "UNKNOWN_ERROR") {
      return { error, shouldHandleError: false, shouldRethrow: true };
    }

    return { error, shouldHandleError: true, shouldRethrow: false };
  }

  componentDidCatch(error: unknown) {
    const { onError } = this.props;
    onError?.(error);
  }

  render() {
    const { fallbackComponent, children, className } = this.props;
    const { shouldHandleError, shouldRethrow, error } = this.state;

    if (shouldRethrow) throw error;
    if (!shouldHandleError) return children;

    const description = isCodeError(error)
      ? (error.displayMessage ?? error.message ?? "잠시 후 다시 시도해 주세요.")
      : "잠시 후 다시 시도해 주세요.";

    return (
      fallbackComponent ?? (
        <EmptyState
          title="문제가 발생했어요"
          description={description}
          className={className}
          Icon={TriangleAlert}
        />
      )
    );
  }
}
