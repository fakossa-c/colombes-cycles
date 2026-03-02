"use client";

import { useReveal } from "@/components/ui/useReveal";
import SectionTitle from "@/components/ui/SectionTitle";

const values = [
  {
    title: "Franchise",
    description:
      "Vous arrivez avec un vélo qui ne vaut plus grand-chose à réparer, et on vous le dit. Vous posez une question, on vous répond vraiment : pas ce que vous voulez entendre. Ce n'est pas toujours confortable, mais c'est toujours utile.",
  },
  {
    title: "Maîtrise",
    description:
      "Quinze ans passés à comprendre les vélos, pas seulement à les vendre. C'est la certification BOSCH eBike qu'on n'a pas obtenue parce que c'était sur un formulaire à remplir, mais parce qu'on s'est formés pour. C'est François qui sait d'où vient un bruit de pédalier rien qu'à l'oreille, et Mathys qui sort un diagnostic VAE sans tâtonner.",
  },
  {
    title: "Ancrage",
    description:
      "Choisir de faire ce métier ici, dans ce quartier, et assumer que nos clients sont nos voisins. On ne fait pas semblant de les connaître : on les connaît vraiment. Et cette proximité, c'est une responsabilité.",
  },
  {
    title: "Soin",
    description:
      "Le vélo qu'on vous rend propre même quand il n'était pas demandé. La réparation expliquée en trois phrases claires. L'attention portée aux détails que vous ne verrez peut-être pas, mais qui font que le vélo durera.",
  },
  {
    title: "Caractère",
    description:
      "On a des opinions sur les marques. On sait ce qu'on aime et pourquoi. On dit quand un modèle ne nous convainc pas, même si on pourrait le vendre. Cette identité-là, elle ne ressemble à aucune autre boutique : et c'est exprès.",
  },
];

export default function ValuesGrid() {
  const ref = useReveal(0.1);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal">
          <SectionTitle className="mb-6">
            Ce qu&apos;on croit et ce qu&apos;on fait.
          </SectionTitle>
          <p className="text-anthracite/60 text-[0.95rem] leading-relaxed max-w-2xl mb-16">
            Chez Colombes Cycles, les valeurs ne sont pas sur une affiche dans
            la salle de pause. Elles se voient dans ce qui se passe quand vous
            entrez.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div
              key={value.title}
              className={`reveal stagger-${Math.min(i + 1, 5)} border border-anthracite/[0.06] p-8 rounded-sm`}
            >
              <h3 className="font-syne font-700 text-[1.2rem] text-anthracite mb-3">
                {value.title}
              </h3>
              <p className="text-anthracite/60 text-[0.9rem] leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
