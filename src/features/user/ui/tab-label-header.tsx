"use client";

interface TabLabelHeaderProps {
  label: string;
  className?: string;
}

export function TabLabelHeader({ label, className }: TabLabelHeaderProps) {
  return (
    <div className={className}>
      <div className="flex h-9 w-auto cursor-default items-center justify-start gap-1.5 rounded-lg px-3 text-lg font-semibold md:text-xl">
        <span>{label}</span>
      </div>
    </div>
  );
}
