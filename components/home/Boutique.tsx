"use client";

import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { useReveal } from "@/components/ui/useReveal";

export default function Boutique() {
  const ref = useReveal(0.1);

  return (
    <section ref={ref} id="boutique" className="relative bg-ivory py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="reveal-left relative z-10">
            <SectionTitle tag="La boutique">
              <>
                Un magasin <span className="text-terracotta">vrai</span>,
                <br />
                pas une vitrine.
              </>
            </SectionTitle>
            <p className="mt-8 text-anthracite/50 leading-[1.85] text-[0.95rem] max-w-md">
              Ici, les vélos sont montés par ceux qui les vendent.
              L&apos;atelier est <span className="text-anthracite font-medium">visible depuis la boutique</span>.
              On peut vous montrer ce qu&apos;on a changé, vous expliquer pourquoi.
            </p>
            <p className="mt-4 text-anthracite/35 leading-[1.85] text-[0.95rem] max-w-md">
              Ce n&apos;est pas un show-room — c&apos;est un endroit où on travaille, et où vous êtes les bienvenus.
            </p>

            {/* Line accent */}
            <div className="line-grow h-[2px] bg-terracotta mt-8" />
          </div>

          {/* Photo grid */}
          <div className="reveal-right grid grid-cols-12 grid-rows-6 gap-3 h-[500px] md:h-[550px]">
            {/* Main large image — Atelier */}
            <div className="col-span-7 row-span-4 rounded-sm relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1675798227643-da319f8ee8f7?w=800&q=80&fit=crop&auto=format"
                alt="Technicien réparant un vélo à l'atelier Colombes Cycles"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 60vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/40 to-transparent" />
            </div>

            {/* Top right — Boutique */}
            <div className="col-span-5 row-span-3 rounded-sm relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1605271864611-58dd08d10547?w=600&q=80&fit=crop&auto=format"
                alt="Client choisissant un vélo dans le magasin Colombes Cycles"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 40vw, 20vw"
              />
            </div>

            {/* Bottom left — Vue intérieure */}
            <div className="col-span-5 row-span-2 rounded-sm relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1601067095185-b8b73ad7db10?w=600&q=80&fit=crop&auto=format"
                alt="Vue intérieure de la boutique"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 40vw, 20vw"
              />
            </div>

            {/* Bottom right — Vélos en rayon */}
            <div className="col-span-7 row-span-3 rounded-sm relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1521078803125-7efd09b65b8f?w=800&q=80&fit=crop&auto=format"
                alt="Vélos exposés en boutique"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 60vw, 30vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
