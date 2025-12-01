import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDY_PATH = path.join(process.cwd(), "content/case-studies");

export type CaseStudy = {
  slug: string;
  title: string;
  content: string; // 👈 add this
  featured?: boolean;
  summary?: string;
  tags?: string[];
  role?: string;
  period?: string;
  hero?: string;
};

export function getAllCaseStudies(): CaseStudy[] {
  const files = fs.readdirSync(CASE_STUDY_PATH);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(CASE_STUDY_PATH, file);
      const raw = fs.readFileSync(fullPath, "utf8");

      // 👇 this now gives us BOTH front-matter (data) and MDX body (content)
      const { data, content } = matter(raw);

      return {
        slug: data.slug || file.replace(".mdx", ""),
        content,
        ...data,
      } as CaseStudy;
    });
}

export function getFeaturedCaseStudies() {
  return getAllCaseStudies().filter((c) => c.featured);
}

export function getCaseStudyBySlug(slug: string) {
  return getAllCaseStudies().find((c) => c.slug === slug);
}
