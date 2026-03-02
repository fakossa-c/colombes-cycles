"use client";

import { useReveal } from "@/components/ui/useReveal";
import SectionTitle from "@/components/ui/SectionTitle";

const reasons = [
  {
    title: "On diagnostique avant de facturer",
    description:
      "Avant de vous parler de prix, on regarde ce qui se passe vraiment. Chez nous, le diagnostic ne coûte rien : parce qu'un devis juste commence par une inspection honnête.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "On ne remplace pas ce qui n'est pas usé",
    description:
      "Si votre chaîne peut encore rouler 1 000 km, on ne vous en vend pas une nouvelle. On vous dit où en est votre vélo, et vous décidez. La confiance ne s'achète pas : elle se mérite à chaque visite.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "On travaille sur toutes les marques",
    description:
      "Peu importe où vous avez acheté votre vélo. Ce qui compte, c'est de le remettre en état correctement. On s'occupe des vélos achetés chez nous et de tous les autres.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
  },
  {
    title: "On est certifiés BOSCH",
    description:
      "Pour les vélos à assistance électrique avec moteur BOSCH, on dispose des outils de diagnostic officiels. Pas d'à-peu-près, pas d'improvisation.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "On explique ce qu'on a fait",
    description:
      "Quand vous récupérez votre vélo, on vous dit ce qui a été fait et pourquoi. Si une pièce a été changée, on peut vous la montrer. C'est une règle chez nous.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
];

export default function WhyUsGrid() {
  const ref = useReveal(0.1);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal">
          <SectionTitle tag="Pourquoi nous" className="mb-16">
            Pourquoi confier votre vélo à notre atelier ?
          </SectionTitle>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={`reveal stagger-${Math.min(i + 1, 5)} flex gap-4`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
                {reason.icon}
              </div>
              <div>
                <h3 className="font-syne font-700 text-[1rem] text-anthracite mb-2">
                  {reason.title}
                </h3>
                <p className="text-anthracite/60 text-[0.875rem] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
