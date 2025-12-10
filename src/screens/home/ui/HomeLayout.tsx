import type { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return <>{children}</>;
}
