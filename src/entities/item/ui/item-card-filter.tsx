"use client";

import { SlidersHorizontal } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";

interface ItemCardFilterProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export function ItemCardFilter({ value, options, onChange, className }: ItemCardFilterProps) {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="border-border hover:bg-accent/50 flex h-9 w-auto items-center justify-center gap-1 rounded-lg px-3 transition-colors focus:ring-0 [&>svg]:hidden">
          <div className="flex items-center gap-1">
            <SlidersHorizontal className="size-4" />
            <SelectValue placeholder="필터" />
          </div>
        </SelectTrigger>
        <SelectContent align="end">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="data-[state=checked]:text-brand data-[state=checked]:[&_svg]:text-brand! cursor-pointer text-sm data-[state=checked]:font-medium"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
