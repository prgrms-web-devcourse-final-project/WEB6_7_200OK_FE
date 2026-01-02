"use client";

import { useState } from "react";

import {
  CATEGORY_LABEL,
  type CategoryFilter,
  FILTER_CATEGORIES,
} from "@/entities/auction/model/category";
import { CategoryNavItem } from "@/widgets/category-nav/ui/category-nav-item";

// TODO: usePathName 훅 사용해서 경로 받아오고 경로에 따라 보이게/안보이게
// TODO: API 연결 후 주소 기반 수정
export function CategoryNav() {
  const [active, setActive] = useState<CategoryFilter | null>(null);

  return (
    <nav aria-label="카테고리" className="bg-background h-header sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl">
        <ul className="h-header scrollbar-hide flex overflow-x-auto whitespace-nowrap sm:justify-around sm:overflow-visible">
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
