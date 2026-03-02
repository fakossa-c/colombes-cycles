import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Mentions Légales — Colombes Cycles",
  description:
    "Mentions légales du site Colombes Cycles, magasin de vélos à Colombes (92700), Hauts-de-Seine, Île-de-France.",
  alternates: {
    canonical: "https://www.colombes-cycles.fr/mentions-legales",
  },
  openGraph: {
    title: "Mentions Légales — Colombes Cycles",
    description:
      "Mentions légales du site Colombes Cycles, magasin de vélos à Colombes (92700), Hauts-de-Seine, Île-de-France.",
    url: "https://www.colombes-cycles.fr/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        title="Mentions légales"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Mentions légales" },
        ]}
      />

      <section className="py-24 md:py-36">
        <div className="max-w-3xl mx-auto px-6 md:px-10 space-y-16">
          {/* 1. Éditeur */}
          <div>
            <h2 className="font-syne font-700 text-[1.4rem] tracking-tight text-anthracite">
              1. Éditeur du site
            </h2>
            <div className="mt-4 text-anthracite/70 text-[0.9rem] leading-relaxed space-y-2">
              <p>
                <strong className="text-anthracite">Colombes Cycles</strong>
              </p>
              <p>Forme juridique : [A compléter]</p>
              <p>SIRET : [A compléter]</p>
              <p>Adresse : Colombes, 92700</p>
              <p>Téléphone : 01 42 42 66 02</p>
              <p>Directeur de la publication : David Thibault</p>
            </div>
          </div>

          {/* 2. Hébergeur */}
          <div>
            <h2 className="font-syne font-700 text-[1.4rem] tracking-tight text-anthracite">
              2. Hébergeur
            </h2>
            <div className="mt-4 text-anthracite/70 text-[0.9rem] leading-relaxed space-y-2">
              <p>
                <strong className="text-anthracite">Vercel Inc.</strong>
              </p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
              <p>Site web : vercel.com</p>
            </div>
          </div>

          {/* 3. Propriété intellectuelle */}
          <div>
            <h2 className="font-syne font-700 text-[1.4rem] tracking-tight text-anthracite">
              3. Propriété intellectuelle
            </h2>
            <p className="mt-4 text-anthracite/70 text-[0.9rem] leading-relaxed">
              L&apos;ensemble du contenu de ce site (textes, images, logos, éléments graphiques, vidéos) est la propriété exclusive de Colombes Cycles ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de Colombes Cycles.
            </p>
          </div>

          {/* 4. Données personnelles */}
          <div>
            <h2 className="font-syne font-700 text-[1.4rem] tracking-tight text-anthracite">
              4. Données personnelles
            </h2>
            <div className="mt-4 text-anthracite/70 text-[0.9rem] leading-relaxed space-y-3">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition concernant vos données personnelles.
              </p>
              <p>
                Les informations collectées via le formulaire de contact (nom, email, téléphone, message) sont uniquement utilisées pour répondre à vos demandes. Elles ne sont ni vendues, ni transmises à des tiers.
              </p>
              <p>
                Pour exercer vos droits, vous pouvez nous contacter par téléphone au 01 42 42 66 02 ou via le formulaire de la page contact.
              </p>
            </div>
          </div>

          {/* 5. Cookies */}
          <div>
            <h2 className="font-syne font-700 text-[1.4rem] tracking-tight text-anthracite">
              5. Cookies
            </h2>
            <div className="mt-4 text-anthracite/70 text-[0.9rem] leading-relaxed space-y-3">
              <p>
                Ce site peut utiliser des cookies strictement nécessaires au fonctionnement du site. Aucun cookie publicitaire ou de suivi n&apos;est utilisé sans votre consentement explicite.
              </p>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies. Cela n&apos;affectera pas la navigation sur ce site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
