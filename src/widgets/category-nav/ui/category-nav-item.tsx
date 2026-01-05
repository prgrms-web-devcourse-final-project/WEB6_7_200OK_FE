import Link from "next/link";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";

export interface CategoryNavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

export function CategoryNavItem({ href, label, isActive }: CategoryNavItemProps) {
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
        <Link href={href} aria-current={isActive ? "page" : undefined}>
          {label}
        </Link>
      </Button>
    </li>
  );
}
