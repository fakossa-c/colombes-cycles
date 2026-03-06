import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import MapsEmbed from "./MapsEmbed";

export const metadata: Metadata = {
  title: "Contact & Horaires — Colombes Cycles Colombes 92",
  description:
    "Horaires, adresse et contact de Colombes Cycles à Colombes (92700). Venez nous rendre visite ou appelez-nous pour toute question sur nos vélos.",
  alternates: {
    canonical: "https://www.colombes-cycles.fr/contact",
  },
  openGraph: {
    title: "Contact & Horaires — Colombes Cycles Colombes 92",
    description:
      "Horaires, adresse et contact de Colombes Cycles à Colombes (92700). Venez nous rendre visite ou appelez-nous pour toute question sur nos vélos.",
    url: "https://www.colombes-cycles.fr/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Appelez-nous ou passez nous voir."
        subtitle="Une question sur un vélo, une réparation à planifier, un conseil avant d'acheter. On est là."
        tag="Contact"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="py-16 md:py-36">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          {/* Two columns: phone + address */}
          <div className="grid gap-12 md:grid-cols-2">
            {/* Téléphone + Horaires */}
            <div className="space-y-10">
              <div>
                <h3 className="font-syne font-800 text-[1.3rem] tracking-tight text-anthracite">
                  Appelez-nous.
                </h3>
                <a
                  href="tel:0142426602"
                  className="mt-4 inline-flex items-center gap-3 rounded-full bg-terracotta px-7 py-4 text-[0.9rem] font-semibold text-white transition-all duration-500 hover:bg-terracotta-dark active:scale-[0.97]"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  01 42 42 66 02
                </a>
              </div>

              <div>
                <h3 className="font-syne font-800 text-[1.3rem] tracking-tight text-anthracite">
                  Nos horaires d&apos;ouverture.
                </h3>
                <p className="mt-3 text-anthracite/60 text-[0.9rem] leading-relaxed">
                  On vous accueille du mardi au samedi. Le dimanche et le lundi, l&apos;atelier se repose. Et nous aussi.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-[0.9rem]">
                    <span className="text-anthracite font-medium">Mardi · Samedi</span>
                    <span className="text-anthracite/70">9h · 19h</span>
                  </div>
                  <div className="flex justify-between text-[0.9rem]">
                    <span className="text-anthracite font-medium">Dimanche et lundi</span>
                    <span className="text-anthracite/70">Fermé</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adresse + Carte */}
            <div className="space-y-10">
              <div>
                <h3 className="font-syne font-800 text-[1.3rem] tracking-tight text-anthracite">
                  Passez nous voir.
                </h3>
                <p className="mt-3 text-anthracite/60 text-[0.9rem] leading-relaxed">
                  Colombes Cycles<br />
                  12 Av. Henri Barbusse<br />
                  92700 Colombes
                </p>
              </div>

              {/* Google Maps — pointer-events géré dans MapsEmbed (anti-capture scroll) */}
              <MapsEmbed />
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="mt-20 max-w-2xl">
            <h2 className="font-syne font-700 text-[1.4rem] text-anthracite mb-8">
              Envoyez-nous un message.
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
