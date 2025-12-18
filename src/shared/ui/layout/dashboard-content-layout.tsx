import * as React from "react";

interface DashboardContentLayoutProps {
  labelNode?: React.ReactNode;
  filterNode?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardContentLayout({
  labelNode,
  filterNode,
  children,
  className,
}: DashboardContentLayoutProps) {
  return (
    <div className={className}>
      {(labelNode || filterNode) && (
        <div className="mb-4 flex h-9 w-full items-center justify-between gap-2.5">
          <div className="flex-1">{labelNode}</div>
          <div className="flex shrink-0">{filterNode}</div>
        </div>
      )}

      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
