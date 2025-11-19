import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content/getBlogPosts.server";

// Blog Index
export const metadata = {
  title: "Writing",
  description:
    "A collection of notes, code snippets, and loosely formed ideas on design, tech, and the process of figuring things out.",
};

export default async function Blog() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <div className="intro mb-22 flex flex-col gap-4">
        <h1 className="text-base text-pretty">Writing</h1>
        <p>
          A collection of notes, code snippets, and loosely formed ideas on
          design, tech, and the process of figuring things out.
        </p>
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="my-2">
            <Link
              href={`/blog/${post.slug}`}
              className="-mx-4 flex flex-col gap-1.5 rounded-md px-4 py-3 text-base text-neutral-50 transition-all duration-250 hover:bg-stone-50/5 hover:text-neutral-50 active:bg-stone-50/5"
            >
              <div className="flex items-center justify-between gap-4 md:gap-8">
                <h2 className="max-w-[320px] truncate text-base md:max-w-[500px]">
                  {post.title}
                </h2>
                <div className="block grow border-t border-gray-400/25" />
                <span className="shrink-0 font-mono text-xs text-neutral-400">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
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
    </>
  );
}
