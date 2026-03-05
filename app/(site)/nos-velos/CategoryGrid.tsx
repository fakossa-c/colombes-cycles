"use client";

import Link from "next/link";
import { useReveal } from "@/components/ui/useReveal";
import { categories } from "@/lib/data/categories";

const taglines: Record<string, string> = {
  "velos-de-ville": "Pour rouler vraiment, tous les jours.",
  "velos-electriques": "L'assistance qui change tout.",
  "vtt": "Pour ceux qui veulent sortir des routes.",
  "velos-enfants": "Le bon vélo au bon moment.",
  "accessoires": "Ce qui fait la différence sur la route.",
};

export default function CategoryGrid() {
  const ref = useReveal(0.1);

  return (
    <section ref={ref} className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/nos-velos/${cat.slug}`}
              className={`group reveal stagger-${index + 1} block rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1`}
            >
              <div className="aspect-[4/3] bg-anthracite/[0.05] flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-anthracite/20 transition-colors duration-300 group-hover:text-terracotta/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
              </div>
              <div className="p-6">
                <h2 className="font-syne font-700 text-lg text-anthracite group-hover:text-terracotta transition-colors duration-300">
                  {cat.title}
                </h2>
                <p className="mt-2 text-sm text-anthracite/50">
                  {taglines[cat.slug]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
