"use client";

import {
  BlogPreview,
  ExternalLink,
  ExplorationsGrid,
  BookCall,
} from "@/components";

export default function Home() {
  return (
    <>
      <div className="mb-4 flex flex-col gap-4">
        <h1>
          I'm a product design lead with over a decade of experience crafting
          mobile & web products for founders, startups and global organizations.
        </h1>
        <p>
          Currently taking a short break while exploring ideas for my next
          venture. Most recently, I led product design at{" "}
          <ExternalLink href="https://haven1.org/">Haven1</ExternalLink>, a
          blockchain built for safer DeFi. Previously at{" "}
          <ExternalLink href="https://agoda.com/">Agoda</ExternalLink>,{" "}
          <ExternalLink href="https://brankas.com/">Brankas</ExternalLink>,{" "}
          <ExternalLink href="https://says.com/">Says</ExternalLink> and Yield
          App.
        </p>
      </div>

      <BookCall />
      <ExplorationsGrid />
      <BlogPreview />
    </>
  );
}
