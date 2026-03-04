import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

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

              {/* Google Maps */}
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.0!2d2.2442!3d48.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e665c1e6d7e8a7%3A0x0!2s12+Avenue+Henri+Barbusse%2C+92700+Colombes!5e0!3m2!1sfr!2sfr!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Colombes Cycles — 12 Av. Henri Barbusse, 92700 Colombes"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
