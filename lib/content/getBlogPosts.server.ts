// lib/content/getBlogPosts.server.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Get a single blog post by slug
 */
export const getBlogPostBySlug = (slug: string) => {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    draft: Boolean(data.draft),
    image: data.image ?? "",
    readingTime: Math.ceil(stats.minutes),
    content,
  };
};

/**
 * Get all published blog posts
 */
export const getAllBlogPosts = () => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR);

  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const post = getBlogPostBySlug(slug);
      return post;
    })
    .filter((p) => p && !p.draft)
    .sort((a, b) => {
      const dateA = new Date(a?.date ?? 0).getTime();
      const dateB = new Date(b?.date ?? 0).getTime();
      return dateB - dateA;
    });
};
