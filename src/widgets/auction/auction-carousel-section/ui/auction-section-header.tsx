import Link from "next/link";

import { ChevronRight } from "lucide-react";

interface AuctionSectionHeaderProps {
  title: string;
  description: string;
  href: string | null;
}

export function AuctionSectionHeader({ title, description, href }: AuctionSectionHeaderProps) {
  return (
    <header className="flex items-end justify-between select-none">
      <div className="px-1.5">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </div>

      <div>
        {href && (
          <Link
            href={href}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
            aria-label={`${title} 더보기`}
          >
            더보기
            <ChevronRight aria-hidden="true" className="size-3.5" />
          </Link>
        )}
      </div>
    </header>
  );
}
