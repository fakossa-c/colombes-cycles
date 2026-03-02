"use client";

import Button from "@/components/ui/Button";
import { useReveal } from "@/components/ui/useReveal";

type CtaBlockProps = {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
};

export default function CtaBlock({ title, subtitle, ctaText, ctaHref }: CtaBlockProps) {
  const ref = useReveal(0.2);

  return (
    <section ref={ref} className="py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <div className="reveal">
          <h2 className="font-syne font-800 text-[1.8rem] md:text-[2.5rem] leading-[1.05] tracking-tight text-anthracite">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-4 text-anthracite/60 text-lg font-light">
              {subtitle}
            </p>
          )}
        </div>

        <div className="reveal stagger-2 mt-10">
          <Button href={ctaHref}>{ctaText}</Button>
        </div>
      </div>
    </section>
  );
}
