"use client";

import { type LucideIcon } from "lucide-react";

interface TabLabeHeaderProps {
  label: string;
  icon: LucideIcon;
  className?: string;
}

export function TabLabeHeader({ label, icon: Icon, className }: TabLabeHeaderProps) {
  return (
    <div className={className}>
      <div className="flex h-9 w-auto cursor-default items-center justify-start gap-1.5 rounded-lg px-3 text-sm">
        <Icon className="size-5 shrink-0" />
        <span>{label}</span>
      </div>
    </div>
  );
}
