import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBlock from "@/components/ui/CtaBlock";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Conseils Vélo & Entretien — Blog Colombes Cycles",
  description:
    "Conseils entretien, guides d'achat, actualités vélo : le blog de Colombes Cycles pour tous les cyclistes de Colombes et des Hauts-de-Seine.",
  alternates: {
    canonical: "https://www.colombes-cycles.fr/blog",
  },
  openGraph: {
    title: "Conseils Vélo & Entretien — Blog Colombes Cycles",
    description:
      "Conseils entretien, guides d'achat, actualités vélo : le blog de Colombes Cycles pour tous les cyclistes de Colombes et des Hauts-de-Seine.",
    url: "https://www.colombes-cycles.fr/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Conseils, guides et actualités vélo."
        subtitle="Des articles pratiques pour rouler mieux, plus longtemps."
        tag="Blog"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Blog" },
        ]}
      />

      <BlogGrid />

      <CtaBlock
        title="Une question sur votre vélo ?"
        subtitle="Passez nous voir à Colombes. Ou appelez. On répond."
        ctaText="Nous contacter"
        ctaHref="/contact"
      />
    </>
  );
}
