import { Search, X } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import Input from "@/shared/ui/input/input";

interface SearchInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SearchInput({
  className,
  placeholder,
  value,
  onDelete,
  ...props
}: SearchInputProps) {
  const hasValue = (v: number | string | readonly string[] | undefined) => {
    if (v === undefined) return false;
    if (typeof v === "number") return true;
    if (typeof v === "string" || Array.isArray(value)) return v.length > 0;
    return false;
  };
  return (
    <div
      className={cn(
        "flex items-center",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "shadow-none"
      )}
    >
      <Search className="text-muted-foreground size-5" />
      <Input
        type="text"
        className={cn(
          "flex-1",
          "border-none bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
          className
        )}
        value={value}
        placeholder={placeholder ?? "검색어를 입력해주세요"}
        {...props}
      />
      {hasValue(value) && (
        <button
          type="button"
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-600"
          onClick={onDelete}
          aria-label="검색어 삭제"
        >
          <X className="text-muted-foreground size-4" />
        </button>
      )}
    </div>
  );
}
