"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", label: "" },
  { id: "services", label: "Métiers" },
  { id: "process", label: "Atelier" },
  { id: "boutique", label: "Boutique" },
  { id: "equipe", label: "Équipe" },
  { id: "avis", label: "Avis" },
  { id: "cta", label: "" },
];

/** Mini bike wheel that spins with scroll */
function MiniWheel({ size = 48 }: { size?: number }) {
  const spokes = 10;
  const r = size / 2;
  const rim = r - 2.5;
  const hub = r * 0.2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={r} cy={r} r={rim} stroke="currentColor" strokeWidth="2" />
      <circle cx={r} cy={r} r={rim - 2} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx={r} cy={r} r={hub} stroke="currentColor" strokeWidth="1.2" />
      <circle cx={r} cy={r} r={hub * 0.4} fill="currentColor" />
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i * 360) / spokes;
        const rad = (angle * Math.PI) / 180;
        const cos = Math.round(Math.cos(rad) * 1e10) / 1e10;
        const sin = Math.round(Math.sin(rad) * 1e10) / 1e10;
        return (
          <line
            key={i}
            x1={r + hub * cos}
            y1={r + hub * sin}
            x2={r + (rim - 2) * cos}
            y2={r + (rim - 2) * sin}
            stroke="currentColor"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
}


const darkSections = new Set(["hero", "avis", "cta"]);

export default function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const pct = docHeight > 0 ? scrollY / docHeight : 0;
          setProgress(pct);
          setVisible(scrollY > window.innerHeight * 0.5);

          if (wheelRef.current) {
            wheelRef.current.style.transform = `rotate(${scrollY * 0.35}deg)`;
          }

          const sectionEls = sections
            .map((s) => document.getElementById(s.id))
            .filter(Boolean) as HTMLElement[];

          let current = 0;
          for (let i = sectionEls.length - 1; i >= 0; i--) {
            if (
              sectionEls[i].getBoundingClientRect().top <=
              window.innerHeight * 0.4
            ) {
              current = i;
              break;
            }
          }
          setActiveIndex(current);
          setOnDark(darkSections.has(sections[current]?.id ?? ""));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={lineRef}
      className={`fixed left-5 md:left-8 top-0 bottom-0 z-[40] pointer-events-none transition-opacity duration-700 hidden md:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Track line */}
      <div className={`absolute left-[23px] top-[10vh] bottom-[10vh] w-[2px] transition-colors duration-500 ${onDark ? "bg-white/[0.08]" : "bg-anthracite/[0.05]"}`} />

      {/* Progress fill */}
      <div
        className={`absolute left-[23px] top-[10vh] w-[2px] origin-top transition-colors duration-500 ${onDark ? "bg-white/30" : "bg-terracotta/30"}`}
        style={{ height: `${progress * 80}vh`, transition: "height 0s" }}
      />

      {/* Moving wheel */}
      <div
        className="absolute left-0"
        style={{
          top: `calc(10vh + ${progress * 80}vh - 24px)`,
          transition: "none",
        }}
      >
        <div
          ref={wheelRef}
          className={`will-change-transform transition-colors duration-500 ${onDark ? "text-white" : "text-terracotta"}`}
          style={{
            filter: onDark
              ? "drop-shadow(0 0 12px rgba(255,255,255,0.2))"
              : "drop-shadow(0 0 12px rgba(196,98,45,0.35))",
          }}
        >
          <MiniWheel size={48} />
        </div>
      </div>

      {/* Waypoints */}
      {sections.map((section, i) => {
        if (!section.label) return null;
        const y = 10 + (i / (sections.length - 1)) * 80;
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;

        return (
          <div
            key={section.id}
            className="absolute hidden md:flex items-center"
            style={{ top: `${y}vh`, left: "0", transform: "translateY(-50%)" }}
          >
            {/* Tick mark across the line */}
            <div className="w-[48px] flex items-center justify-center">
              <div
                className={`h-[2px] transition-all duration-500 ${
                  isActive
                    ? `w-[20px] ${onDark ? "bg-white" : "bg-terracotta"}`
                    : isPast
                    ? `w-[12px] ${onDark ? "bg-white/25" : "bg-terracotta/25"}`
                    : `w-[8px] ${onDark ? "bg-white/10" : "bg-anthracite/8"}`
                }`}
              />
            </div>

            {/* Label */}
            <span
              className={`font-syne font-700 text-[0.75rem] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-500 ml-3 ${
                isActive
                  ? `${onDark ? "text-white" : "text-terracotta"} opacity-100 translate-x-0`
                  : isPast
                  ? `${onDark ? "text-white/25" : "text-anthracite/25"} opacity-100 translate-x-0`
                  : `${onDark ? "text-white/10" : "text-anthracite/8"} opacity-0 translate-x-[-6px]`
              }`}
            >
              {section.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
