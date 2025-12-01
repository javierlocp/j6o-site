import Link from "next/link";
import Image from "next/image";

export default function CaseStudyCard({ caseStudy, showHeading = true }) {
  if (!caseStudy) return null;

  const { slug, title, timeframe, industry, summary, cover, tags = [] } = caseStudy;

  return (
    <section aria-label="Case Study" className="mb-20">
      {showHeading && (
        <div className="mb-10 flex flex-col">
          <h2 className="mb-4 text-base text-neutral-50">Selected Works</h2>
          <p>A few of my recent case studies. More will be added soon.</p>
        </div>
      )}

      <Link
        href={`/case-study/${slug}`}
        className="group block overflow-hidden rounded-2xl border border-neutral-700/45 p-2 transition hover:border-neutral-500 hover:bg-neutral-900/80"
      >
        {/* Thumb */}
        <div className="group/thumbnail relative aspect-3/2 cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              width={1280}
              height={985}
              className="object-contain transition-transform duration-300 ease-out group-hover/thumbnail:scale-[1.02]"
            />
          ) : (
            <div className="aspect-3/2 w-full bg-neutral-900" />
          )}
        </div>

        {/* Text block */}
        <div className="flex flex-col gap-2 my-5 mx-3">
          <p className="text-xs font-mono text-neutral-400 ">
            <span>{industry}</span>
            {timeframe ? ` • ${timeframe}` : null}
          </p>
          <div className="flex flex-col gap-1">
            <h3 className="text-base text-neutral-50">{title}</h3>
            <p className="line-clamp-2 text-sm text-neutral-400">{summary}</p>
          </div>

          {/* {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-neutral-50/10 py-1 px-2.5 text-xs text-neutral-50 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}
        </div>
      </Link>
    </section>
  );
}
