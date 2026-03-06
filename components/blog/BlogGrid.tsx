"use client";

import Image from "next/image";
import { useReveal } from "@/components/ui/useReveal";
import { articles, type BlogArticle } from "@/lib/data/blog-posts";

function BlogCard({ article, index }: { article: BlogArticle; index: number }) {
  return (
    <article className={`reveal stagger-${index + 1} group`}>
      <div className="aspect-[16/9] rounded-sm mb-5 overflow-hidden relative">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
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
      <span className="mt-4 inline-block text-[0.8rem] font-medium tracking-wide text-anthracite/30 cursor-default">
        Bientôt disponible
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
