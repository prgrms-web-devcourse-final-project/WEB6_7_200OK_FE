import { Suspense } from "react";

import { CategoryNav } from "@/widgets/category-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <CategoryNav />
      </Suspense>
      {children}
    </>
  );
}
