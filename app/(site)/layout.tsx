import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/BikeWheel";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BikeStore"],
    "@id": "https://www.colombes-cycles.fr/#business",
    name: "Colombes Cycles",
    description:
      "Magasin de vélos à Colombes (92700). Vente de vélos ville, électrique, VTT, enfants. Réparation toutes marques. Certifié BOSCH eBike.",
    url: "https://www.colombes-cycles.fr",
    telephone: "0142426602",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombes",
      postalCode: "92700",
      addressRegion: "Hauts-de-Seine",
      addressCountry: "FR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "€€",
    founder: { "@type": "Person", name: "David Thibault" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "271",
      bestRating: "5",
      worstRating: "1",
    },
    brand: [
      { "@type": "Brand", name: "Orbea" },
      { "@type": "Brand", name: "Peugeot Cycles" },
      { "@type": "Brand", name: "Gitane" },
      { "@type": "Brand", name: "Velodeville" },
      { "@type": "Brand", name: "BOSCH eBike Systems" },
    ],
    areaServed: [
      { "@type": "City", name: "Colombes" },
      { "@type": "City", name: "Bois-Colombes" },
      { "@type": "City", name: "La Garenne-Colombes" },
      { "@type": "City", name: "Asnières-sur-Seine" },
      { "@type": "City", name: "Gennevilliers" },
      { "@type": "City", name: "Argenteuil" },
      { "@type": "City", name: "Nanterre" },
      { "@type": "City", name: "Courbevoie" },
      { "@type": "City", name: "Clichy" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Topbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
