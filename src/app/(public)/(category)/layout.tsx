import { type ReactNode, Suspense } from "react";

import { CategoryNav } from "@/widgets/category-nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <CategoryNav />
      </Suspense>
      {children}
    </>
  );
}
