// app/api/posts/route.js
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts.server";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}
