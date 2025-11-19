// app/rss.xml/route.js
import { getAllBlogPosts } from "@/lib/content/getBlogPosts.server";
import { Feed } from "rss";

export async function GET() {
  const baseUrl = "https://javierlo.com";

  const feed = new Feed({
    title: "Javier Lo — Blog",
    description:
      "Thoughts on product design, process, and building tools in public.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/favicon/favicon-dark.ico`,
    copyright: `© ${new Date().getFullYear()} Javier Lo`,
  });

  const posts = getAllBlogPosts();

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${baseUrl}/blog/${post.slug}`,
      link: `${baseUrl}/blog/${post.slug}`,
      description: post.excerpt || post.description,
      date: new Date(post.date),
      image: post.image ? `${baseUrl}${post.image}` : undefined,
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
