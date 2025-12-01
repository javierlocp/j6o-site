// app/case-study/[slug]/page.js
import path from "node:path";
import fs from "node:fs/promises";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdxComponents";
import {
  getCaseStudyBySlug,
  getAllCaseStudies,
} from "@/lib/content/getCaseStudies.server";

// Pre-generate static paths for all case studies
export function generateStaticParams() {
  const all = getAllCaseStudies();
  return all.map((cs) => ({ slug: cs.slug }));
}

// Helper: load MDX from /content/case-studies/<slug>.mdx
async function loadCaseStudyMdx(slug) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "case-studies",
    `${slug}.mdx`
  );

  try {
    const source = await fs.readFile(filePath, "utf8");
    return source;
  } catch {
    // No MDX file yet; we'll just fall back to summary
    return null;
  }
}

// Next 16: params is a Promise, so we must await it
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    return { title: "Case study not found" };
  }

  return {
    title: `${cs.title} — Case Study`,
    description: cs.summary,
  };
}

// Main page component
export default async function CaseStudyPage({ params }) {
  const { slug } = await params;

  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) {
    notFound();
  }

  const mdxSource = await loadCaseStudyMdx(slug);

  return (
    <>
      <section className="max-w-full mt-10 space-y-10">
        {mdxSource ? (
          <MDXRemote source={caseStudy.content} components={mdxComponents} />
        ) : (
          <p className="text-sm text-neutral-300">{caseStudy.summary}</p>
        )}
      </section>
    </>
  );
}
