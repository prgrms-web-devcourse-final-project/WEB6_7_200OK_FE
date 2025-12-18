import { Component, type ReactNode } from "react";

import { TriangleAlert } from "lucide-react";

import { ApiError } from "@/shared/api/error/api-error";
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
    if (!(error instanceof ApiError)) {
      return {
        error,
        shouldHandleError: false,
        shouldRethrow: true,
      };
    }

    if (error.code === "UNNKOWN_ERROR") {
      return {
        error,
        shouldHandleError: false,
        shouldRethrow: true,
      };
    }

    return {
      error,
      shouldHandleError: true,
      shouldRethrow: false,
    };
  }

  componentDidCatch(error: unknown) {
    const { onError } = this.props;
    onError?.(error);
  }

  render() {
    const { fallbackComponent, children, className } = this.props;
    const { shouldHandleError, shouldRethrow, error } = this.state;

    if (shouldRethrow) {
      throw error;
    }

    if (!shouldHandleError) {
      return children;
    }

    return (
      fallbackComponent ?? (
        <EmptyState
          title="문제가 발생했어요"
          description={error instanceof ApiError ? error.message : "잠시 후 다시 시도해 주세요."}
          className={className}
          Icon={TriangleAlert}
        />
      )
    );
  }
}
