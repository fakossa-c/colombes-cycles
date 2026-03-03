"use client";

import { useReveal } from "@/components/ui/useReveal";
import SectionTitle from "@/components/ui/SectionTitle";

const steps = [
  {
    num: "01",
    title: "Diagnostic",
    desc: "On regarde, on écoute, on identifie. Gratuit, toujours.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Devis clair",
    desc: "Vous savez ce qu'on va faire, combien ça coûte. Pas de surprises.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Réparation",
    desc: "Le travail est fait. Proprement. Sans raccourcis.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "On vous explique",
    desc: "Ce qu'on a fait, pourquoi, et ce qu'il faudra surveiller.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function RepairProcess() {
  const ref = useReveal(0.1);

  return (
    <section ref={ref} id="process" className="bg-cream py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal text-center mb-16 md:mb-24">
          <SectionTitle tag="L'atelier">
            <>
              Votre vélo entre,
              <br />
              il ressort <span className="text-terracotta">comme neuf.</span>
            </>
          </SectionTitle>
        </div>

        {/* Steps — vertical timeline on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-[1px] bg-anthracite/[0.08]" />

          <div className="grid md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`reveal stagger-${i + 1} relative text-center group`}
              >
                {/* Circle */}
                <div className="relative mx-auto w-[4.25rem] h-[4.25rem] rounded-full bg-anthracite flex items-center justify-center mb-6 z-10 group-hover:bg-terracotta transition-colors duration-500">
                  <div className="text-white transition-transform duration-500 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-terracotta rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white group-hover:bg-anthracite transition-colors duration-500">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-syne font-700 text-lg text-anthracite mb-2">
                  {step.title}
                </h3>
                <p className="text-anthracite/40 text-sm leading-relaxed max-w-[200px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOSCH badge */}
        <div className="reveal mt-20 bg-anthracite rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            <div className="w-20 h-20 rounded-full border-2 border-terracotta/30 flex items-center justify-center">
              <svg className="w-10 h-10 text-terracotta" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-terracotta mb-2">
              Certifié BOSCH eBike
            </p>
            <h3 className="font-syne font-700 text-xl md:text-2xl text-white mb-3">
              Votre VAE entre de <span className="text-terracotta">bonnes mains.</span>
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xl">
              Mathys est certifié BOSCH eBike. Diagnostic officiel, outils homologués,
              pas d&apos;à-peu-près. Moteur, batterie, capteurs. Si votre VAE a un souci,
              c&apos;est ici que vous devriez commencer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
