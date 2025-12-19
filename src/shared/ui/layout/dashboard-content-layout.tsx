import * as React from "react";

interface DashboardContentLayoutProps {
  label?: React.ReactNode;
  filters?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardContentLayout({
  label,
  filters,
  children,
  className,
}: DashboardContentLayoutProps) {
  return (
    <div className={className}>
      {(label || filters) && (
        <div className="mb-4 flex h-9 w-full items-center justify-between gap-2.5">
          <div className="flex-1">{label}</div>
          <div className="flex shrink-0">{filters}</div>
        </div>
      )}

      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
