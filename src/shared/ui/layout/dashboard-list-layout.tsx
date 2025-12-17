import * as React from "react";

interface DashboardListLayoutProps {
  filterNode?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardListLayout({ filterNode, children, className }: DashboardListLayoutProps) {
  return (
    <div className={className}>
      {filterNode && (
        <div className="mb-4 flex h-9 w-full flex-col items-end justify-center gap-2.5">
          {filterNode}
        </div>
      )}

      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
