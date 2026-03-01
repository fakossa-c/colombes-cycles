import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/BikeWheel";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.colombes-cycles.fr"),
  title: {
    template: "%s | Colombes Cycles",
    default: "Colombes Cycles — Vélos & Réparations à Colombes (92)",
  },
  description:
    "Votre magasin vélo à Colombes (92). Vente de vélos ville, électrique, VTT, enfants. Réparation toutes marques. David Thibault, 15 ans d'expertise.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.colombes-cycles.fr",
    siteName: "Colombes Cycles",
    images: [
      {
        url: "/images/og-colombes-cycles.jpg",
        width: 1200,
        height: 630,
        alt: "Colombes Cycles — Magasin de vélos à Colombes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-colombes-cycles.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://www.colombes-cycles.fr" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
    <html lang="fr" className={`${syne.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-inter bg-cream text-anthracite antialiased overflow-x-hidden">
        <ScrollProgress />
        <Topbar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
