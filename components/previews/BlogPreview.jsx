"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllBlogPosts } from "@/lib/api/getBlogPosts.client";

// This is a component to import most recent 4 posts and show it in Home Page.

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await getAllBlogPosts();
      setPosts(allPosts.slice(0, 4));
    }
    loadPosts();
  }, []);

  return (
    <>
      <section aria-label="Blog Preview" className="mb-20">
        <div className="mb-4 flex flex-col gap-1">
          <h2 className="text-base text-neutral-50">Writing</h2>
        </div>
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="my-2">
              <Link
                href={`/blog/${post.slug}`}
                className="-mx-4 flex flex-col gap-1.5 rounded-md px-4 py-3 text-base text-neutral-50 transition-all duration-250 hover:bg-stone-50/5 hover:text-neutral-50 active:bg-stone-50/5"
              >
                <div className="flex items-center justify-between gap-4 md:gap-8 ">
                  <h3 className="max-w-[320px] truncate font-semibold md:max-w-[500px] text-base">
                    {post.title}
                  </h3>
                  <div className="block grow border-t border-gray-400/25" />
                  <span className="shrink-0 font-mono text-xs text-neutral-400">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                    })}
                  </span>
                </div>
                <span className="line-clamp-2 text-neutral-400">
                  {post.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          aria-label="Read all blog posts"
          className="mt-2 inline-block text-sm underline decoration-wavy decoration-0 underline-offset-2 hover:text-neutral-50"
        >
          Read all
        </Link>
      </section>
    </>
  );
};

export default BlogPreview;
