import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBlock from "@/components/ui/CtaBlock";
import CategoryGrid from "./CategoryGrid";

export const metadata: Metadata = {
  title: "Nos Vélos — Ville, Électrique, VTT | Colombes Cycles",
  description:
    "Découvrez notre gamme complète : vélos de ville, électriques, VTT et enfants. Marques Orbea, Peugeot, Gitane, Velodeville. En stock à Colombes 92.",
  alternates: {
    canonical: "https://www.colombes-cycles.fr/nos-velos",
  },
};

export default function NosVelos() {
  return (
    <>
      <PageHero
        tag="Notre gamme"
        title="Des vélos sélectionnés pour durer."
        subtitle="On ne vend pas tous les vélos qui passent. Notre gamme est choisie marque par marque, modèle par modèle — Orbea, Peugeot Cycles, Gitane, Velodeville. Chaque vélo en rayon, on l'a eu en main, on sait ce qu'il vaut et pour qui il est fait. Si un modèle ne nous convainc pas, il ne rentre pas. Voilà pourquoi le conseil qu'on vous donne ici est honnête : on ne vous dirigera pas vers ce qui marche le mieux pour nous."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Nos Vélos" },
        ]}
      />

      <CategoryGrid />

      <CtaBlock
        title="Vous ne savez pas encore par où commencer ?"
        subtitle="Passez en boutique, on regarde ensemble."
        ctaText="Prendre rendez-vous en boutique"
        ctaHref="/contact"
      />
    </>
  );
}
