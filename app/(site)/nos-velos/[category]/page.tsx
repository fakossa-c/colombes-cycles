import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import CtaBlock from "@/components/ui/CtaBlock";
import { categories, getCategoryBySlug } from "@/lib/data/categories";

const CATEGORY_IMAGES: Record<string, string> = {
  "velos-de-ville":    "https://images.unsplash.com/photo-1602517232715-c4a366f0ce1b?w=600&q=80&fit=crop&auto=format",
  "velos-electriques": "https://images.unsplash.com/photo-1620802051782-725fa33db067?w=600&q=80&fit=crop&auto=format",
  "vtt":               "https://images.unsplash.com/photo-1606087492572-424ebe0f2f61?w=600&q=80&fit=crop&auto=format",
  "velos-enfants":     "https://images.unsplash.com/photo-1595182747080-3b43712dd27d?w=600&q=80&fit=crop&auto=format",
  "accessoires":       "https://images.unsplash.com/photo-1596731530340-64945278d9f6?w=600&q=80&fit=crop&auto=format",
};

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: {
      canonical: `https://www.colombes-cycles.fr/nos-velos/${cat.slug}`,
    },
  };
}

const ORBEA_CDN = "https://www.orbea.com/img/products/product/over/list";

const placeholderProducts: Record<string, { name: string; price: string; image?: string }[]> = {
  "velos-de-ville": [
    { name: "Orbea Vibe Urban", price: "899 €", image: `${ORBEA_CDN}/T366TTCC-W7-SIDE-KEMEN_TOUR_20_over.jpg` },
    { name: "Peugeot LC01 City", price: "649 €" },
    { name: "Velodeville L200", price: "749 €" },
    { name: "Gitane City Link", price: "549 €" },
  ],
  "velos-electriques": [
    { name: "Orbea Optima E40", price: "2 899 €", image: `${ORBEA_CDN}/U378TTCC-WD-SIDE-CARPE_25_over.jpg` },
    { name: "Peugeot eLC01 BOSCH", price: "2 499 €" },
    { name: "Orbea Vibe Mid BOSCH", price: "3 199 €", image: `${ORBEA_CDN}/R307TTCC-W1-SIDE-VIBE_MID_H10_over.jpg` },
  ],
  vtt: [
    { name: "Orbea MX 30", price: "799 €", image: `${ORBEA_CDN}/T210TTCC-M2-SIDE-ALMA_H30_over.jpg` },
    { name: "Peugeot M02 Trail", price: "1 099 €" },
    { name: "Orbea Laufey H30", price: "1 299 €", image: `${ORBEA_CDN}/T233TTCC-PG-SIDE-LAUFEY_H30_over.jpg` },
  ],
  "velos-enfants": [
    { name: "Peugeot J16 (16 pouces)", price: "249 €" },
    { name: "Gitane Miniz 20 pouces", price: "299 €" },
    { name: "Peugeot J12 Draisienne", price: "89 €" },
  ],
  accessoires: [
    { name: "Casque Abus Urban-I 3.0", price: "79 €" },
    { name: "Antivol Kryptonite U-Lock", price: "59 €" },
    { name: "Éclairage Busch+Müller Ixon", price: "49 €" },
    { name: "Sacoche Ortlieb Back-Roller", price: "119 €" },
  ],
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const products = placeholderProducts[cat.slug] || [];
  const categoryFallbackImage = CATEGORY_IMAGES[cat.slug];

  return (
    <>
      <PageHero
        tag={cat.title}
        title={cat.pageTitle}
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Nos Vélos", href: "/nos-velos" },
          { label: cat.breadcrumbLabel },
        ]}
      />

      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-anthracite/70 text-[1.05rem] leading-relaxed max-w-3xl">
            {cat.description}
          </p>

          <div className="mt-12 bg-terracotta/[0.06] border-l-4 border-terracotta p-6 md:p-8 rounded-sm max-w-3xl">
            <p className="text-anthracite/70 text-[0.95rem] leading-relaxed italic">
              {cat.angleConseil}
            </p>
          </div>

          <div className="mt-20">
            <h2 className="font-syne font-700 text-[1.4rem] md:text-[1.8rem] text-anthracite mb-10">
              Nos modèles
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className={`reveal stagger-${index + 1} group rounded-sm overflow-hidden`}
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-anthracite/[0.05]">
                    {(product.image || categoryFallbackImage) && (
                      <Image
                        src={product.image ?? categoryFallbackImage!}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-syne font-600 text-sm text-anthracite">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-terracotta">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {cat.brands.length > 0 && (
            <div className="mt-20">
              <h2 className="font-syne font-700 text-[1.4rem] md:text-[1.8rem] text-anthracite mb-8">
                Nos marques
              </h2>
              <div className="flex flex-wrap gap-4">
                {cat.brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-5 py-2.5 bg-anthracite/[0.05] rounded-full text-sm text-anthracite/70 font-medium"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cat.velodevilleConfigUrl && (
            <div className="mt-16 bg-anthracite/[0.03] border border-anthracite/[0.08] rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-terracotta mb-1">Velodeville</p>
                <h3 className="font-syne font-700 text-xl text-anthracite">Configurez votre vélo en ligne</h3>
                <p className="mt-2 text-anthracite/50 text-sm">
                  Choisissez votre coloris et vos options directement sur le site Velodeville — revendeur officiel Colombes Cycles.
                </p>
              </div>
              <a
                href={cat.velodevilleConfigUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-anthracite text-cream px-6 py-3 text-[0.75rem] font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-terracotta transition-colors duration-300 whitespace-nowrap"
              >
                Configurer →
              </a>
            </div>
          )}
        </div>
      </section>

      <CtaBlock
        title="Vous ne savez pas encore par où commencer ?"
        subtitle="Passez en boutique, on regarde ensemble."
        ctaText="Contactez-nous"
        ctaHref="/contact"
      />
    </>
  );
}
