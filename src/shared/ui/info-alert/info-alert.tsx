import { AlertCircle } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

interface InfoAlertProps {
  message: string;
  className?: string;
}

export function InfoAlert({ message, className }: InfoAlertProps) {
  return (
    <div
      className={cn(
        "border-info-bg/70 bg-info-bg/30 flex items-center gap-2 rounded-lg border p-3",
        className
      )}
    >
      <AlertCircle className="text-info-text size-4 shrink-0" />
      <p className="text-info-text text-xs">{message}</p>
    </div>
  );
}
