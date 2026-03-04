import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBlock from "@/components/ui/CtaBlock";
import SectionTitle from "@/components/ui/SectionTitle";
import ValuesGrid from "./ValuesGrid";
import StorySection from "./StorySection";

export const metadata: Metadata = {
  title: "À Propos — Colombes Cycles, 15 ans d'expertise",
  description:
    "Colombes Cycles, c'est David Thibault et 15 ans de passion pour le vélo. Note 4,8/5 sur 271 avis Google. Votre expert vélo de confiance à Colombes.",
  alternates: {
    canonical: "https://www.colombes-cycles.fr/a-propos",
  },
};

const brands = [
  {
    name: "Orbea",
    description:
      "Fabricant basque fondé en 1840. Des vélos bien construits, avec une vraie identité. De la route au gravel, de la ville au VAE, Orbea couvre des usages sérieux avec une qualité de finition qu'on peut recommander les yeux fermés aux clients exigeants.",
  },
  {
    name: "Peugeot Cycles",
    description:
      "Une marque française avec 135 ans d'histoire dans le vélo. Elle a traversé les modes sans se perdre. Des vélos solides, accessibles, qui ont équipé des générations de cyclistes. On est fiers de la proposer.",
  },
  {
    name: "Gitane",
    description:
      "Autre marque française historique, qui a côtoyé les plus grands du cyclisme professionnel. Aujourd'hui repositionnée sur des vélos accessibles de qualité, elle garde un caractère et une légitimité qu'on respecte.",
  },
  {
    name: "Velodeville",
    description:
      "Une marque contemporaine, orientée vélo urbain et quotidien. Des vélos pensés pour les vrais trajets de ville, bien équipés, dans des gammes de prix raisonnables.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        title="15 ans de vélos. Et ça continue."
        tag="Notre histoire"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "À propos" },
        ]}
      />

      {/* Story */}
      <StorySection />

      {/* Values */}
      <ValuesGrid />

      {/* BOSCH Certification */}
      <section className="bg-anthracite py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="mb-8">
              <svg
                className="w-10 h-10 text-terracotta"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>

            <SectionTitle light>
              Certifié BOSCH eBike. Ce que ça veut vraiment dire.
            </SectionTitle>

            <div className="mt-10 space-y-6 text-white/70 text-[0.95rem] leading-relaxed">
              <p>
                BOSCH eBike Systems est l&apos;un des systèmes d&apos;assistance
                électrique les plus répandus et les plus fiables du marché. Ses
                moteurs équipent des milliers de VAE vendus chaque année en France.
                La marque forme et certifie un réseau de partenaires : revendeurs
                agréés et ateliers habilités à utiliser les outils de diagnostic
                officiels.
              </p>
              <p>Colombes Cycles fait partie de ce réseau.</p>
              <p>
                En pratique, ça veut dire que Mathys a suivi la formation technique
                BOSCH, que notre atelier dispose du diagnostic BOSCH eBike Flow, et
                que nous sommes habilités à intervenir sur les systèmes motorisés
                BOSCH : moteur, batterie, afficheur, capteurs. Ce n&apos;est pas
                une garantie de miracle, mais c&apos;est la garantie qu&apos;on ne
                navigue pas à l&apos;aveugle sur votre vélo électrique.
              </p>
              <p className="text-white font-medium">
                Si vous avez un VAE BOSCH qui dysfonctionne, c&apos;est ici que
                vous devriez commencer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle tag="Nos marques" className="mb-16">
            Les marques qu&apos;on a choisies. Et pourquoi.
          </SectionTitle>

          <p className="text-anthracite/60 text-[0.95rem] leading-relaxed max-w-2xl mb-12">
            On ne distribue pas tout le monde. On a sélectionné des marques
            qu&apos;on peut défendre en conscience devant nos clients.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="border border-anthracite/[0.06] p-8 rounded-sm"
              >
                <h3 className="font-syne font-700 text-[1.3rem] text-anthracite mb-4">
                  {brand.name}
                </h3>
                <p className="text-anthracite/60 text-[0.9rem] leading-relaxed">
                  {brand.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBlock
        title="Envie de passer nous voir ?"
        subtitle="On est à Colombes, du mardi au samedi."
        ctaText="Nous contacter"
        ctaHref="/contact"
      />
    </>
  );
}
