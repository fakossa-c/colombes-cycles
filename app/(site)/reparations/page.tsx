import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBlock from "@/components/ui/CtaBlock";
import SectionTitle from "@/components/ui/SectionTitle";
import ServicesGrid from "./ServicesGrid";
import WhyUsGrid from "./WhyUsGrid";
import { pricingData } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Réparation Vélo à Colombes — Atelier Cycles 92",
  description:
    "Atelier réparation vélo à Colombes. Révision, crevaison, freins, dérailleur, vélo électrique. Technicien certifié BOSCH. Devis rapide, 92700.",
  alternates: {
    canonical: "https://www.colombes-cycles.fr/reparations",
  },
};

export default function ReparationsPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Réparation et entretien de vélos",
    description:
      "Atelier de réparation vélo à Colombes. Révision complète, crevaison, freins, dérailleur, vélo électrique BOSCH. Devis gratuit.",
    provider: {
      "@id": "https://www.colombes-cycles.fr/#business",
    },
    serviceType: "Bicycle Repair",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "48.9234",
        longitude: "2.2528",
      },
      geoRadius: "10000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de réparation",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Révision complète" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Réparation crevaison" },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Réglage freins et dérailleur",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Entretien vélo électrique BOSCH",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <PageHero
        title="L'atelier. Là où les vélos retrouvent la forme."
        subtitle="Chez Colombes Cycles, l'atelier n'est pas une arrière-salle. C'est le coeur de ce qu'on fait. Christophe, François et Mathys s'y relaient pour remettre les vélos en état — ceux qu'on a vendus, et les autres aussi. On accepte toutes les marques. On diagnostique avant de facturer. Et on explique ce qu'on a fait, parce qu'un client qui comprend ce qui a été réparé fait confiance à la facture."
        tag="Réparations"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Réparations" },
        ]}
      />

      {/* Services */}
      <ServicesGrid />

      {/* Pricing Table */}
      <section className="py-24 md:py-36 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle tag="Tarifs indicatifs" className="mb-16">
            Grille tarifaire
          </SectionTitle>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-anthracite/10">
                  <th className="font-syne font-700 text-anthracite py-4 pr-8 text-[0.95rem]">
                    Prestation
                  </th>
                  <th className="font-syne font-700 text-anthracite py-4 text-[0.95rem] text-right">
                    Tarif indicatif
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-anthracite/[0.06] ${
                      i % 2 === 0 ? "bg-anthracite/[0.02]" : ""
                    }`}
                  >
                    <td className="py-4 pr-8 text-[0.9rem] text-anthracite/80">
                      {row.service}
                    </td>
                    <td className="py-4 text-[0.9rem] font-semibold text-anthracite text-right whitespace-nowrap">
                      {row.tarif}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-[0.85rem] text-anthracite/50 leading-relaxed max-w-2xl">
            Les tarifs sont donnés à titre indicatif. Le prix final dépend de
            l&apos;état du vélo et des pièces nécessaires. On établit toujours un
            devis avant d&apos;intervenir.
          </p>
        </div>
      </section>

      {/* Why Us */}
      <WhyUsGrid />

      {/* CTA */}
      <CtaBlock
        title="Votre vélo mérite d'être regardé par quelqu'un qui s'y connaît vraiment."
        subtitle="Prenez rendez-vous à l'atelier. On regarde, on diagnostique, on vous dit ce qu'il en est."
        ctaText="Prendre rendez-vous"
        ctaHref="/contact"
      />
    </>
  );
}
