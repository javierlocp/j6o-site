// lib/api/getBlogPosts.client.ts
export const getAllBlogPosts = async () => {
  const res = await fetch("/api/blog", { next: { revalidate: 60 } }); // optional cache
  if (!res.ok) {
    console.error("Failed to fetch blog posts:", res.statusText);
    return [];
  }
  return res.json();
};
