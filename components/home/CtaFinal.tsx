"use client";

import Button from "@/components/ui/Button";
import { useReveal } from "@/components/ui/useReveal";

export default function CtaFinal() {
  const ref = useReveal(0.2);

  return (
    <section ref={ref} id="cta" className="relative bg-ivory py-24 md:py-36 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
        <div className="reveal">
          <p className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-terracotta mb-6">
            Dernière chose
          </p>

          <h2 className="font-syne font-800 text-[2rem] md:text-[3rem] lg:text-[3.8rem] leading-[1.05] tracking-tight text-anthracite">
            Votre vélo mérite mieux
            <br />
            qu&apos;un rayon d&apos;<span className="text-terracotta">hypermarché.</span>
          </h2>

          <p className="mt-6 text-anthracite/40 text-lg font-light">
            Passez nous voir à Colombes. <span className="text-anthracite/60 font-medium">Ou appelez, on répond.</span>
          </p>
        </div>

        <div className="reveal stagger-2 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contact">Prendre rendez-vous</Button>
          <Button href="tel:0142426602" variant="outline">
            01 42 42 66 02
          </Button>
        </div>
      </div>
    </section>
  );
}
