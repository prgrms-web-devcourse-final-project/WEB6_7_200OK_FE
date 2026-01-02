import { ReactNode } from "react";

export default function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}
