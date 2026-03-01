"use client";

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

          {/* Photo grid placeholders with parallax feel */}
          <div className="reveal-right grid grid-cols-12 grid-rows-6 gap-3 h-[500px] md:h-[550px]">
            {/* Main large image */}
            <div className="col-span-7 row-span-4 rounded-sm bg-anthracite/[0.05] flex items-end p-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-anthracite/25">
                <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" />
                </svg>
                <p className="text-xs font-medium">L&apos;atelier</p>
              </div>
            </div>

            {/* Top right small */}
            <div className="col-span-5 row-span-3 rounded-sm bg-anthracite/[0.07] flex items-center justify-center">
              <div className="text-center text-anthracite/20">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" />
                </svg>
                <p className="text-[0.65rem]">La boutique</p>
              </div>
            </div>

            {/* Bottom left */}
            <div className="col-span-5 row-span-2 rounded-sm bg-anthracite/[0.04] flex items-center justify-center">
              <p className="text-[0.65rem] text-anthracite/20">Vue intérieure</p>
            </div>

            {/* Bottom right */}
            <div className="col-span-7 row-span-3 rounded-sm bg-terracotta/[0.06] flex items-center justify-center relative overflow-hidden">
              <div className="text-center text-terracotta/30">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" />
                </svg>
                <p className="text-[0.65rem]">Les vélos en rayon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
