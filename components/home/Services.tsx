"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { useReveal } from "@/components/ui/useReveal";
import { useParallax } from "@/components/ui/useParallax";

const services = [
  {
    num: "01",
    title: "Des vélos choisis avec soin.",
    text: (
      <>
        On ne vend pas tout, exprès. Notre gamme est sélectionnée pour{" "}
        <strong className="text-anthracite font-semibold">durer</strong>. Orbea,
        Peugeot Cycles, Gitane, Velodeville. On vous dira celui qui vous
        convient, <em className="text-terracotta not-italic font-medium">pas celui qui coûte le plus cher.</em>
      </>
    ),
    label: "Vente",
  },
  {
    num: "02",
    title: "Un atelier qui répare sans détour.",
    text: (
      <>
        Christophe, François et Mathys s&apos;occupent de votre vélo{" "}
        <strong className="text-anthracite font-semibold">comme si c&apos;était le leur</strong>.
        Crevaison, freins, transmission, électronique BOSCH. On diagnostique
        honnêtement, on explique ce qu&apos;on fait. <em className="text-terracotta not-italic font-medium">Pas de surprises.</em>
      </>
    ),
    label: "Réparation",
  },
  {
    num: "03",
    title: "Le bon conseil, même s'il ne nous arrange pas.",
    text: (
      <>
        Vous avez un doute sur une réparation ? On vous dit ce qu&apos;on pense
        vraiment. Si votre vélo n&apos;a pas besoin d&apos;une révision complète,{" "}
        <em className="text-terracotta not-italic font-medium">on ne vous en facture pas une.</em>{" "}
        C&apos;est comme ça qu&apos;on travaille depuis le début.
      </>
    ),
    label: "Conseil",
  },
];

export default function Services() {
  const revealRef = useReveal(0.1);
  const parallaxRef = useParallax();

  return (
    <section
      ref={(el) => {
        (revealRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      id="services"
      className="bg-cream py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Background oversized text */}
        <div
          className="absolute right-0 top-0 font-syne font-800 text-[12vw] text-anthracite/[0.015] select-none leading-none pointer-events-none"
          data-speed="0.04"
        >
          MÉTIER
        </div>

        <div className="reveal mb-20 md:mb-28 relative">
          <SectionTitle tag="Nos métiers">
            <>
              Ce qu&apos;on fait, et comment
              <br />
              <span className="text-terracotta">on le fait.</span>
            </>
          </SectionTitle>
        </div>

        <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-0">
          {services.map((service, i) => (
            <div
              key={i}
              className={`reveal stagger-${i + 1} group relative md:px-8 lg:px-12 ${
                i < services.length - 1 ? "md:border-r md:border-anthracite/[0.06]" : ""
              }`}
            >
              <span className="font-syne font-800 text-[5rem] md:text-[6rem] leading-none text-anthracite/[0.04] block mb-[-2rem] md:mb-[-2.5rem]">
                {service.num}
              </span>
              <p className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-terracotta mb-3">
                {service.label}
              </p>
              <h3 className="font-syne font-700 text-xl md:text-[1.35rem] text-anthracite mb-5 leading-snug">
                {service.title}
              </h3>
              <p className="text-anthracite/50 leading-[1.8] text-[0.92rem]">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
