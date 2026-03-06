import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BikeWheel from "@/components/ui/BikeWheel";
import { siteConfig } from "@/lib/data/site-config";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BikeStore"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description:
      "Magasin de vélos à Colombes (92700). Vente de vélos ville, électrique, VTT, enfants. Réparation toutes marques. Certifié BOSCH eBike.",
    url: siteConfig.url,
    telephone: `+33${siteConfig.phoneTel.replace(/^0/, "")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: "Hauts-de-Seine",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
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
    founder: { "@type": "Person", name: siteConfig.owner },
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/images/logo.png`,
    },
    image: `${siteConfig.url}/images/og-colombes-cycles.jpg`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(siteConfig.google.rating),
      reviewCount: siteConfig.google.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    brand: siteConfig.brands.map((name) => ({ "@type": "Brand", name })),
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
      <BikeWheel />
      <Topbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
