"use client";

import { useState } from "react";

import {
  FILTER_CATEGORIES,
  CATEGORY_LABEL,
  type CategoryFilter,
} from "@/entities/item/model/category";
import { CategoryNavItem } from "@/widgets/category-nav/ui/category-nav-item";

export function CategoryNav() {
  // TODO: API 연결 후 주소 기반 수정
  const [active, setActive] = useState<CategoryFilter | null>(null);

  return (
    <nav aria-label="카테고리" className="bg-background h-header sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl">
        <ul className="scrollbar-hide flex h-14 overflow-x-auto whitespace-nowrap sm:justify-around sm:overflow-visible">
          {FILTER_CATEGORIES.map((category) => (
            <CategoryNavItem
              key={category}
              label={CATEGORY_LABEL[category]}
              isActive={active === category}
              onClick={() => setActive(category)}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
