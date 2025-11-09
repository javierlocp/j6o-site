// lib/posts.server.js
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDir = path.join(process.cwd(), "content", "posts");

export const getPostBySlug = (slug) => {
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // calculate reading time
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

export const getAllPosts = () => {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const post = getPostBySlug(slug);
      return post;
    })
    .filter((p) => p && !p.draft) // 🧠 hide drafts
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};
