// app/sitemap.js
import { getAllBlogPosts } from "@/lib/content/getBlogPosts.server";
// (optional) if you later have lib/projects.server.js, import getAllProjects too
// import { getAllProjects } from "@/lib/projects.server";

export default async function sitemap() {
  const baseUrl = "https://javierlo.com";

  // BLOG POSTS
  const posts = getAllBlogPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || new Date().toISOString(),
  }));

  // FUTURE PROJECTS (placeholder so it won’t break anything now)
  const projectUrls = []; // Replace with getAllProjects() once ready

  // STATIC PAGES
  const staticUrls = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/blog`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/projects`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
  ];

  return [...staticUrls, ...blogUrls, ...projectUrls];
}
