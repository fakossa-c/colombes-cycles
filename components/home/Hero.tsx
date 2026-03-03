"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const slow = el.querySelectorAll<HTMLElement>("[data-speed]");
          slow.forEach((child) => {
            const speed = parseFloat(child.dataset.speed || "0");
            child.style.transform = `translateY(${scrollY * speed}px)`;
          });
          // Fade out hero on scroll
          const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.6));
          el.style.setProperty("--hero-fade", String(opacity));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative bg-anthracite text-white overflow-hidden min-h-[100svh] flex items-center"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        data-speed="0.02"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Large background text — parallax */}
      <div
        className="absolute right-[-5%] top-[15%] font-syne font-800 text-[18vw] leading-none text-white/[0.015] select-none whitespace-nowrap"
        data-speed="0.08"
      >
        CYCLES
      </div>

      <div
        className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-40 lg:py-48 w-full"
        style={{ opacity: "var(--hero-fade, 1)" }}
      >
        {/* Top badge */}
        <div className="hero-badge flex items-center gap-3 mb-6 md:mb-10">
          <div className="w-10 h-[1px] bg-terracotta" />
          <span className="text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-white/50">
            Atelier de cycles · Colombes 92
          </span>
        </div>

        {/* Title with parallax */}
        <h1 className="hero-title font-syne font-800 text-[3rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] tracking-[-0.03em]" data-speed="-0.03">
          Ici, on connaît
          <br />
          <span className="text-terracotta">votre vélo.</span>
        </h1>

        {/* Accent line */}
        <div className="hero-line h-[3px] w-20 bg-terracotta mt-8 mb-8" />

        {/* Subtitle — slightly different speed for depth */}
        <p className="hero-subtitle text-lg md:text-xl text-white/45 leading-relaxed max-w-lg font-light" data-speed="-0.01">
          Vente, réparation, conseil. Par des gens qui roulent
          <span className="text-white/70 font-medium"> et qui s&apos;en souviennent.</span>
          <br />
          <span className="text-white/30">Depuis 15 ans à Colombes.</span>
        </p>

        {/* CTAs */}
        <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4">
          <Button href="/contact" variant="primary">
            Prendre RDV
          </Button>
          <Button href="/nos-velos" variant="outline-light">
            Découvrir nos vélos
          </Button>
        </div>

        {/* Bottom stats */}
        <div className="hero-badge absolute bottom-10 right-6 md:right-10 hidden md:flex items-center gap-8 text-white/30 text-sm">
          <div className="text-right">
            <span className="block font-syne font-800 text-2xl text-white/70">
              4,8<span className="text-terracotta">/5</span>
            </span>
            <span className="text-[0.65rem] tracking-wider uppercase">271 avis Google</span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="text-right">
            <span className="block font-syne font-800 text-2xl text-white/70">
              15<span className="text-terracotta"> ans</span>
            </span>
            <span className="text-[0.65rem] tracking-wider uppercase">De métier</span>
          </div>
        </div>
      </div>
    </section>
  );
}
