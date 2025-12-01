import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content/getBlogPosts.server";
import Image from "next/image";
import BackButton from "@/components/primitives/BackButton";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdxComponents";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Javier Lo",
    };
  }

  const title = `${post.title} | Javier Lo`;
  const description = post.excerpt || post.description || "Digital product designer building tools, sharing thoughts, and working in public.";
  const image = post.image || "/showcase/ai/motion.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://javierlo.com/blog/${slug}`,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: "Javier Lo", url: "https://javierlo.com" }],
  };
}

export default async function BlogPost({ params }) {
  // ✅ Unwrap the promise
  const { slug } = await params;

  const post = getBlogPostBySlug(slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-xl px-8 py-12 md:px-6">
      <BackButton />
      <article>
        <span className="mt-10 mb-4 flex items-center gap-5 font-mono text-xs text-neutral-400">
          {new Date(post.date).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
          {post.readingTime && ` · ${post.readingTime} min read`}
        </span>

        <div className="flex flex-col gap-2">
          <h1>{post.title}</h1>
          <p className="text-pretty">{post.excerpt}</p>
        </div>

        {post.image && (
          <div className="my-8 text-sm text-neutral-400">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={800}
              className="aspect-3/2 h-auto w-full rounded-lg object-cover"
              priority={false}
            />
          </div>
        )}

        <div className="md-content-style prose prose-invert max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
    </main>
  );
}
