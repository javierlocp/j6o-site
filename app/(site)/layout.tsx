import type { ReactNode } from "react";
import { Navbar, Footer } from "@/components/layout";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
