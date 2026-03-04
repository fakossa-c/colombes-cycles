"use client";

import { useReveal } from "@/components/ui/useReveal";
import { articles, type BlogArticle } from "@/lib/data/blog-posts";

function BlogCard({ article, index }: { article: BlogArticle; index: number }) {
  return (
    <article className={`reveal stagger-${index + 1} group`}>
      {/* Image placeholder */}
      <div className="aspect-[16/9] rounded-sm bg-anthracite/[0.05] flex items-center justify-center mb-5 overflow-hidden">
        <svg
          className="h-10 w-10 text-anthracite/15 transition-transform duration-500 group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5"
          />
        </svg>
      </div>

      {/* Date */}
      <time dateTime={article.dateISO} className="text-[0.75rem] text-anthracite/40">
        {article.date}
      </time>

      {/* Title */}
      <h3 className="mt-2 font-syne font-700 text-[1.1rem] leading-snug tracking-tight text-anthracite group-hover:text-terracotta transition-colors duration-300">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="mt-2 text-anthracite/60 text-[0.85rem] leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>

      {/* Link */}
      <span className="mt-4 inline-block text-[0.8rem] font-semibold tracking-wide text-terracotta underline underline-offset-4 decoration-2 decoration-terracotta/30 transition-colors duration-300 group-hover:decoration-terracotta">
        Lire l&apos;article
      </span>
    </article>
  );
}

export default function BlogGrid() {
  const ref = useReveal(0.1);

  return (
    <section ref={ref} className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <BlogCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
