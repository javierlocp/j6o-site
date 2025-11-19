// app/api/blog/route.js
import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/content/getBlogPosts.server";

export async function GET() {
  const blogPosts = getAllBlogPosts();
  return NextResponse.json(blogPosts);
}
