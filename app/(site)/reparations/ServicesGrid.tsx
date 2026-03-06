"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useReveal } from "@/components/ui/useReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import BlueprintBg from "./BlueprintBg";
import BikeInteractiveSvg from "./BikeInteractiveSvg";
import { services, serviceLabels, type ServiceKey } from "@/lib/data/services";

export default function ServicesGrid() {
  const sectionRef = useReveal(0.05);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const active = services[activeIndex].key;

  // Check mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 960);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll carousel to active card (desktop)
  useEffect(() => {
    if (isMobile) return;
    const card = cardRefs.current[activeIndex];
    const container = carouselRef.current;
    const track = trackRef.current;
    if (!card || !container || !track) return;

    const containerH = container.offsetHeight;
    const cardTop = card.offsetTop;
    const cardH = card.offsetHeight;
    const offset = cardTop - containerH / 2 + cardH / 2;
    track.style.transform = `translateY(-${Math.max(0, offset)}px)`;
  }, [activeIndex, isMobile]);

  // Scroll carousel to active card (mobile)
  useEffect(() => {
    if (!isMobile) return;
    const card = cardRefs.current[activeIndex];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, services.length - 1));
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Wheel on carousel
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isMobile) return;
      e.preventDefault();
      if (e.deltaY > 20)
        setActiveIndex((i) => Math.min(i + 1, services.length - 1));
      else if (e.deltaY < -20) setActiveIndex((i) => Math.max(i - 1, 0));
    },
    [isMobile]
  );

  // Select from bike
  const onBikeSelect = useCallback((service: ServiceKey) => {
    const idx = services.findIndex((s) => s.key === service);
    if (idx !== -1) setActiveIndex(idx);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden">
      {/* ═══ BLUEPRINT GRID — full section, radial mask ═══ */}
      {/* Layer 1: far — blurry, wide coverage */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0.06,
          filter: "blur(2px)",
          maskImage: "radial-gradient(ellipse 90% 80% at 35% 58%, black 5%, rgba(0,0,0,0.4) 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 35% 58%, black 5%, rgba(0,0,0,0.4) 40%, transparent 80%)",
        }}
      >
        <BlueprintBg variant="full" />
      </div>
      {/* Layer 2: mid — moderate blur */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0.12,
          filter: "blur(0.8px)",
          maskImage: "radial-gradient(ellipse 70% 70% at 35% 58%, black 10%, rgba(0,0,0,0.3) 35%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 35% 58%, black 10%, rgba(0,0,0,0.3) 35%, transparent 60%)",
        }}
      >
        <BlueprintBg variant="full" />
      </div>
      {/* Layer 3: near — sharp, tight around bike */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0.22,
          filter: "blur(0.2px)",
          maskImage: "radial-gradient(ellipse 45% 55% at 35% 58%, black 15%, rgba(0,0,0,0.2) 50%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 45% 55% at 35% 58%, black 15%, rgba(0,0,0,0.2) 50%, transparent 75%)",
        }}
      >
        <BlueprintBg variant="full" />
      </div>

      <div className="relative z-[1] max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="reveal mb-14 text-center">
          <SectionTitle tag="Nos services">
            Ce qu&apos;on fait à l&apos;atelier.
          </SectionTitle>
        </div>

        <div className="reveal flex flex-col lg:flex-row items-stretch gap-8 lg:gap-15">
          {/* ═══ BIKE SIDE ═══ */}
          <div className="flex-1 flex items-center justify-center min-w-0 mx-auto lg:mx-0">
            <div className="relative w-full max-w-[780px]">

              <BikeInteractiveSvg active={active} onSelect={onBikeSelect} />

              {/* Floating labels */}
              {serviceLabels.map((l) => (
                <button
                  key={l.key}
                  onClick={() => onBikeSelect(l.key)}
                  className={`
                    absolute text-[0.6rem] font-semibold tracking-[0.12em] uppercase
                    text-terracotta cursor-pointer transition-all duration-300
                    whitespace-nowrap hidden lg:flex items-center gap-1.5
                    before:content-[''] before:w-3 before:h-px before:bg-terracotta
                    before:opacity-40 before:transition-all before:duration-300
                    hover:opacity-100 hover:before:w-5 hover:before:opacity-100
                    ${active === l.key ? "opacity-100 before:!w-5 before:!opacity-100" : "opacity-50"}
                  `}
                  style={l.style}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* ═══ CAROUSEL SIDE ═══ */}
          <div
            ref={carouselRef}
            className={`
              relative lg:flex-[0_0_380px]
              lg:h-[520px] lg:overflow-hidden
            `}
            onWheel={onWheel}
          >
            {/* Fade masks (desktop) */}
            <div className="hidden lg:block absolute inset-x-0 top-0 h-15 z-2 pointer-events-none bg-gradient-to-b from-cream to-transparent" />
            <div className="hidden lg:block absolute inset-x-0 bottom-0 h-15 z-2 pointer-events-none bg-gradient-to-t from-cream to-transparent" />

            {/* Scroll arrows (desktop) */}
            <button
              onClick={() =>
                setActiveIndex((i) => Math.max(i - 1, 0))
              }
              className={`
                hidden lg:flex absolute right-3 top-2 z-3
                w-7 h-7 rounded-full bg-white shadow-md
                items-center justify-center
                transition-all duration-300 opacity-70 hover:opacity-100
                ${activeIndex === 0 ? "!opacity-0 pointer-events-none" : ""}
              `}
            >
              <svg className="w-3.5 h-3.5 text-anthracite" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveIndex((i) =>
                  Math.min(i + 1, services.length - 1)
                )
              }
              className={`
                hidden lg:flex absolute right-3 bottom-2 z-3
                w-7 h-7 rounded-full bg-white shadow-md
                items-center justify-center
                transition-all duration-300 opacity-70 hover:opacity-100
                ${activeIndex === services.length - 1 ? "!opacity-0 pointer-events-none" : ""}
              `}
            >
              <svg className="w-3.5 h-3.5 text-anthracite" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Track */}
            <div
              ref={trackRef}
              className={`
                transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]
                lg:pt-10 lg:pb-10
                flex lg:block gap-3 overflow-x-auto lg:overflow-visible
                snap-x snap-mandatory lg:snap-none
                scrollbar-none
              `}
              style={{ scrollbarWidth: "none" }}
            >
              {services.map((service, i) => {
                const isActive = i === activeIndex;
                const isNeighbor = Math.abs(i - activeIndex) === 1;

                return (
                  <div
                    key={service.key}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    onClick={() => setActiveIndex(i)}
                    className={`
                      relative px-7 py-8 rounded-md cursor-pointer
                      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                      snap-center
                      flex-[0_0_280px] lg:flex-none lg:mb-3

                      before:content-[''] before:absolute before:left-0
                      before:top-2 before:bottom-2 before:w-[3px]
                      before:rounded-sm before:bg-terracotta
                      before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)]
                      before:origin-top

                      ${
                        isActive
                          ? "opacity-100 scale-100 bg-terracotta/[0.04] before:scale-y-100"
                          : isNeighbor
                          ? "opacity-55 lg:blur-[0.5px] scale-[0.98] before:scale-y-0"
                          : "opacity-35 lg:blur-[1px] scale-[0.97] before:scale-y-0"
                      }
                    `}
                  >
                    {/* Number watermark */}
                    <span
                      className={`
                        absolute top-2.5 right-4 font-syne font-800
                        text-[3.5rem] leading-none text-anthracite
                        transition-opacity duration-500 select-none
                        ${isActive ? "opacity-[0.06]" : "opacity-[0.04]"}
                      `}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="font-syne font-700 text-[1.25rem] text-anthracite mb-1">
                      {service.title}
                    </h3>
                    <p className="text-terracotta font-medium text-[0.82rem] mb-3.5">
                      {service.tagline}
                    </p>

                    {/* Description: expands on active (desktop), always visible (mobile) */}
                    <p
                      className={`
                        text-anthracite/55 text-[0.85rem] leading-relaxed mb-4
                        lg:overflow-hidden lg:transition-all lg:duration-600
                        lg:ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${isActive ? "lg:max-h-[200px]" : "lg:max-h-0 lg:!mb-0"}
                      `}
                    >
                      {service.description}
                    </p>

                    <span
                      className={`
                        inline-block font-semibold text-[0.8rem]
                        px-4 py-1.5 rounded-full transition-all duration-300
                        ${
                          isActive
                            ? "bg-terracotta/[0.08] text-terracotta"
                            : "bg-anthracite/[0.05] text-anthracite"
                        }
                      `}
                    >
                      {service.tarif}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
