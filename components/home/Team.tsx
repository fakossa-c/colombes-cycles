"use client";

import { useState, useRef, useCallback } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useReveal } from "@/components/ui/useReveal";

const team = [
  {
    name: "David",
    surname: "Thibault",
    role: "Fondateur · Gérant",
    description:
      "Quinze ans plus tard, il connaît encore chaque client par son prénom, et souvent aussi par son vélo.",
    accent: "C'est lui qui a posé les règles de la maison.",
  },
  {
    name: "François",
    surname: "",
    role: "Technicien composants",
    description:
      "Groupes Shimano, géométrie de cadre. Il s'y connaît avec une précision qui rassure les passionnés.",
    accent: "Et il sait expliquer simplement à ceux qui débutent.",
  },
  {
    name: "Mathys",
    surname: "",
    role: "Spécialiste VAE · Certifié BOSCH",
    description:
      "Il diagnostique les problèmes d'assistance électrique là où d'autres ateliers abandonnent.",
    accent: "Si votre VAE a un souci, il trouvera d'où ça vient.",
  },
  {
    name: "Christophe",
    surname: "",
    role: "Réparations",
    description:
      "Les câbles tendus, les freins mordants, la transmission qui ne grince plus.",
    accent: "Un travail soigné, sans raccourcis.",
  },
];

function TeamCard({
  member,
  index,
  className,
  style,
}: {
  member: (typeof team)[number];
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`group relative bg-cream border border-anthracite/[0.06] rounded-2xl md:rounded-sm p-8 md:p-10 hover:border-terracotta/20 transition-all duration-500 overflow-hidden ${className ?? ""}`}
      style={style}
    >
      <span className="absolute top-4 right-6 font-syne font-800 text-[6rem] leading-none text-anthracite/[0.025] select-none transition-colors duration-500 group-hover:text-terracotta/[0.06]">
        {member.name[0]}
      </span>

      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-anthracite/[0.06] border border-anthracite/[0.08] flex items-center justify-center mb-6 group-hover:border-terracotta/20 transition-colors duration-500">
          <span className="font-syne font-800 text-lg text-anthracite/20 group-hover:text-terracotta/40 transition-colors duration-500">
            {member.name[0]}
            {member.surname ? member.surname[0] : ""}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="font-syne font-800 text-xl text-anthracite">
            {member.name}
            {member.surname && (
              <span className="font-400 text-anthracite/40 ml-1">
                {member.surname}
              </span>
            )}
          </h3>
        </div>

        <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-terracotta mb-4">
          {member.role}
        </p>

        <p className="text-anthracite/45 text-[0.9rem] leading-relaxed mb-2">
          {member.description}
        </p>
        <p className="text-anthracite/70 text-[0.9rem] leading-relaxed font-medium italic">
          {member.accent}
        </p>
      </div>
    </div>
  );
}

function MobileCardStack() {
  const [active, setActive] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const touchRef = useRef({ startX: 0, startY: 0 });

  const next = useCallback(() => {
    setSwiping(true);
    setSwipeX(-400);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % team.length);
      setSwipeX(0);
      setSwiping(false);
    }, 350);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX;
    touchRef.current.startY = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (swiping) return;
      const dx = e.changedTouches[0].clientX - touchRef.current.startX;
      const dy = e.changedTouches[0].clientY - touchRef.current.startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        next();
      }
    },
    [swiping, next]
  );

  const stackRotations = [0, 3, -2.5, 4];

  return (
    <div className="md:hidden">
      <div
        className="relative h-[340px] mx-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => !swiping && next()}
      >
        {team.map((member, i) => {
          const offset = (i - active + team.length) % team.length;
          const isTop = offset === 0;
          const hidden = offset > 2;
          const visOffset = Math.min(offset, 2);
          const rot = stackRotations[visOffset] ?? 0;

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: isTop
                  ? `translateX(${swiping ? swipeX : 0}px) rotate(${swiping ? -12 : 0}deg)`
                  : `translateY(${visOffset * 14}px) rotate(${rot}deg) scale(${1 - visOffset * 0.03})`,
                opacity: hidden ? 0 : 1,
                visibility: hidden ? "hidden" : "visible",
                zIndex: team.length - offset,
                transition: hidden
                  ? "none"
                  : swiping
                    ? "transform 350ms ease-out, opacity 350ms ease-out"
                    : "transform 400ms ease, opacity 400ms ease",
                pointerEvents: isTop ? "auto" : "none",
                filter: isTop ? "none" : `brightness(${1 - visOffset * 0.08})`,
              }}
            >
              <TeamCard
                member={member}
                index={i}
                className={`h-full shadow-lg ${isTop ? "shadow-black/10" : "shadow-black/5"}`}
              />
            </div>
          );
        })}
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="flex gap-2">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "bg-terracotta w-6"
                  : "bg-anthracite/15 hover:bg-anthracite/30"
              }`}
              aria-label={`Carte ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-[0.7rem] text-anthracite/30 font-medium ml-1">
          {active + 1}/{team.length}
        </span>
      </div>
    </div>
  );
}

export default function Team() {
  const ref = useReveal(0.08);

  return (
    <section ref={ref} id="equipe" className="bg-ivory py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal mb-16 md:mb-24">
          <SectionTitle tag="L'équipe">
            <>
              Ceux qui s&apos;occupent
              <br />
              de <span className="text-terracotta">votre vélo.</span>
            </>
          </SectionTitle>
        </div>

        {/* Mobile: swipeable card stack */}
        <MobileCardStack />

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-4 md:gap-5">
          {team.map((member, i) => (
            <TeamCard
              key={i}
              member={member}
              index={i}
              className={`reveal stagger-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
