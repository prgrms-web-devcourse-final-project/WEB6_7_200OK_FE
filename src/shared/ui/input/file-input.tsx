import { LucideIcon, ImagePlus } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import Input from "@/shared/ui/input/input";

interface FileInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  Icon?: LucideIcon;
}

export default function FileInput({
  className,
  id,
  value,
  Icon = ImagePlus,
  ...props
}: FileInputProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-32 w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
    >
      <label
        htmlFor={id ?? "file-input"}
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2"
      >
        <Icon className="text-muted-foreground size-8" />
        <span className="text-muted-foreground text-xs">{value}</span>
      </label>

      <Input
        type="file"
        id={id ?? "file-input"}
        {...props}
        className={cn(
          "h-0 w-0 p-0 shadow-none",
          "border-none bg-transparent focus-visible:ring-0 dark:bg-transparent"
        )}
      />
    </div>
  );
}
