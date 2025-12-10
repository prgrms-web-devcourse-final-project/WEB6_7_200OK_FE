import * as React from "react";

import { X, Search, LucideIcon, ImagePlus } from "lucide-react";

import { isValue } from "@/shared/lib/utils/input";
import { cn } from "@/shared/lib/utils/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

interface SearchInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  onDelete?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function SearchInput({ className, placeholder, value, onDelete, ...props }: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      )}
    >
      <Search className="text-muted-foreground size-6" />
      <Input
        type="text"
        className={cn(
          "flex-1",
          "border-none bg-transparent focus-visible:ring-0 dark:bg-transparent",
          className
        )}
        value={value}
        placeholder={placeholder ?? "검색어를 입력해주세요"}
        {...props}
      />
      {isValue(value) && (
        <button
          type="button"
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-600"
          onClick={onDelete}
        >
          <X className="text-muted-foreground size-4" />
        </button>
      )}
    </div>
  );
}

interface FileInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  Icon?: LucideIcon;
}

function FileInput({ className, id, value, Icon = ImagePlus, ...props }: FileInputProps) {
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
        className="flex h-full w-full flex-col items-center justify-center gap-2"
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
          "border-none bg-transparent focus-visible:ring-0 dark:bg-transparent",
          className
        )}
      />
    </div>
  );
}

export { Input, SearchInput, FileInput };
