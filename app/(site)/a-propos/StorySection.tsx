"use client";

import { useReveal } from "@/components/ui/useReveal";

export default function StorySection() {
  const ref = useReveal(0.1);

  return (
    <section ref={ref} className="py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="reveal space-y-8 text-anthracite/70 text-[1.05rem] leading-[1.8]">
          <p>
            David Thibault n&apos;a pas ouvert Colombes Cycles par hasard. Il y
            avait une vraie raison, et elle n&apos;avait rien à voir avec les
            marges ou les études de marché.
          </p>

          <blockquote className="border-l-4 border-terracotta pl-6 py-2 italic text-[1.15rem] text-anthracite/80">
            Il roulait. Il réparait. Et quand il cherchait un atelier à qui
            faire confiance dans le coin, il ne trouvait pas ce qu&apos;il
            cherchait. Alors il l&apos;a construit lui-même.
          </blockquote>

          <p>
            Au départ, c&apos;était petit. Un atelier, quelques vélos, une idée
            simple : faire le travail correctement, sans chercher à en faire plus
            que nécessaire. Pas de sur-vente. Pas de diagnostics à rallonge. Le
            juste prix pour la bonne prestation. Et si le client ne revenait pas
            parce qu&apos;il n&apos;en avait pas besoin, c&apos;était une bonne
            nouvelle : ça voulait dire que le travail avait été bien fait.
          </p>

          <blockquote className="border-l-4 border-terracotta pl-6 py-2 italic text-[1.15rem] text-anthracite/80">
            Quinze ans après, la philosophie n&apos;a pas changé.
          </blockquote>

          <p>
            L&apos;équipe a grandi. François s&apos;occupe des composants avec
            une précision de chirurgien. Mathys a plongé dans l&apos;univers du
            vélo électrique et en est devenu le spécialiste maison, certifié
            BOSCH. Christophe est à l&apos;établi, attentif, méthodique. Et
            David continue de passer du temps avec les clients : parce que
            c&apos;est là que tout se décide, dans cet échange honnête entre
            quelqu&apos;un qui a un problème et quelqu&apos;un qui peut le
            résoudre.
          </p>

          <p>
            Colombes, ce n&apos;est pas un marché de passage. C&apos;est un
            territoire. Les gens qui habitent ici, les infirmières qui vont à
            Louis-Mourier, les cadres qui descendent vers La Défense à vélo, les
            familles du quartier : on les reconnaît. On se souvient de leur vélo.
            On sait ce qu&apos;on leur a réparé l&apos;année dernière. Ce
            n&apos;est pas de la fidélisation, c&apos;est simplement une façon
            de faire le métier.
          </p>

          <p>
            4,8 sur 5 sur 271 avis Google. Ce chiffre, on ne s&apos;en vante
            pas à tort et à travers, mais il dit quelque chose. 271 personnes ont
            pris le temps d&apos;écrire. Elles n&apos;étaient pas obligées.
          </p>
        </div>
      </div>
    </section>
  );
}
