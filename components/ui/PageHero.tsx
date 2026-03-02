import Breadcrumb from "@/components/ui/Breadcrumb";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  tag?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export default function PageHero({ title, subtitle, tag, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

        {tag && (
          <p className="hero-title text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-terracotta mb-4">
            {tag}
          </p>
        )}

        <h1 className="hero-title font-syne font-800 text-[2.2rem] md:text-[3rem] lg:text-[3.8rem] leading-[1.05] tracking-tight text-anthracite">
          {title}
        </h1>

        {subtitle && (
          <p className="hero-subtitle mt-6 text-anthracite/60 text-[0.95rem] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
