import { getFeaturedCaseStudies } from "@/lib/content/getCaseStudies.server";
import {
  BlogPreview,
  ExternalLink,
  ExplorationsGrid,
  BookCall,
  CaseStudyCard,
} from "@/components";

export default function Home() {
  const caseStudies = getFeaturedCaseStudies();

  return (
    <>
      <main className="mx-auto max-w-xl px-8 py-12 md:px-6">
        <div className="mb-4 flex flex-col gap-4">
          <h1>
            I'm a product design lead with over a decade of experience crafting
            mobile & web products for founders, startups and global
            organizations.
          </h1>
          <p>
            Currently taking a short break while exploring ideas for my next
            venture. Most recently, I led product design at{" "}
            <ExternalLink href="https://portal.haven1.org/">
              Haven1
            </ExternalLink>
            , a blockchain built for safer DeFi. Previously at{" "}
            <ExternalLink href="https://agoda.com/">Agoda</ExternalLink>,{" "}
            <ExternalLink href="https://brankas.com/">Brankas</ExternalLink>,{" "}
            <ExternalLink href="https://says.com/">Says</ExternalLink> and Yield
            App.
          </p>
        </div>
        <BookCall />
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} caseStudy={study} />
        ))}
        <ExplorationsGrid />
        <BlogPreview />
      </main>
    </>
  );
}
