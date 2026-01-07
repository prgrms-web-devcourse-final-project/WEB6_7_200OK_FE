"use client";

import { useSearchParams } from "next/navigation";

import {
  CATEGORY_LABEL,
  type CategoryFilter,
  FILTER_CATEGORIES,
} from "@/entities/auction/model/category";
import { ROUTES } from "@/shared/config/routes";
import { Container } from "@/shared/ui";
import { CategoryNavItem } from "@/widgets/category-nav/ui/category-nav-item";

export function CategoryNav() {
  const categoryParam = useSearchParams().get("category");
  const active = FILTER_CATEGORIES.includes(categoryParam as CategoryFilter)
    ? (categoryParam as CategoryFilter)
    : null;

  return (
    <nav
      aria-label="카테고리"
      className="bg-background h-header md:top-header sticky top-0 z-50 border-b"
    >
      <Container className="p-0">
        <ul className="h-header scrollbar-hide flex overflow-x-auto whitespace-nowrap sm:justify-around sm:overflow-visible">
          {FILTER_CATEGORIES.map((category) => (
            <CategoryNavItem
              key={category}
              label={CATEGORY_LABEL[category]}
              href={`${ROUTES.auctions}?category=${category}`}
              isActive={active === category}
            />
          ))}
        </ul>
      </Container>
    </nav>
  );
}
