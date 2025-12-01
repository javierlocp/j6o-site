// app/case-study/layout.tsx
import type { ReactNode } from "react";
import BackButton from "@/components/primitives/BackButton";

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-[1440px] md:px-20 py-24 px-6">
      <BackButton />
      <article className="my-24">{children}</article>
    </main>
  );
}
