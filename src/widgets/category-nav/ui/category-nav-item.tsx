import Link from "next/link";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

export interface CategoryNavItemProps {
  href?: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export function CategoryNavItem({ href = "#", label, isActive, onClick }: CategoryNavItemProps) {
  return (
    <li className="flex h-full w-fit items-center">
      <Button
        asChild
        variant="link"
        className={cn(
          "h-full rounded-none border-b-2 px-1.5",
          isActive ? "border-brand text-brand-text" : "border-transparent"
        )}
      >
        <Link
          href={href}
          aria-current={isActive ? "page" : undefined}
          // TODO: API 연결 후 수정
          onClick={(e) => {
            if (href === "#") {
              e.preventDefault();
              onClick?.();
            }
          }}
        >
          {label}
        </Link>
      </Button>
    </li>
  );
}
