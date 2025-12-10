import { Search, X } from "lucide-react";

import { isValue } from "@/shared/lib/utils/input";
import { cn } from "@/shared/lib/utils/utils";
import Input from "@/shared/ui/input/input";

interface SearchInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  onDelete?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function SearchInput({
  className,
  placeholder,
  value,
  onDelete,
  ...props
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      )}
    >
      <Search className="text-muted-foreground size-5" />
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
