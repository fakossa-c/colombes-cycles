import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
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
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-inter bg-cream text-anthracite antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
