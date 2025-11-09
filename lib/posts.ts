// lib/posts.js
export const getAllPosts = async () => {
  // This version is only for client components (like BlogPreview)
  // We'll fetch pre-parsed data from an API route instead.
  const res = await fetch("/api/posts");
  if (!res.ok) return [];
  return res.json();
};
