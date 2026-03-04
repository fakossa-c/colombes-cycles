"use client";

import { useState, useRef, useCallback } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useReveal } from "@/components/ui/useReveal";
import { team, type TeamMember } from "@/lib/data/team";

function TeamCard({
  member,
  index,
  className,
  style,
}: {
  member: TeamMember;
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

  const advance = useCallback((dir: -1 | 1) => {
    setSwiping(true);
    setSwipeX(dir * 400);
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
        advance(dx < 0 ? -1 : 1);
      }
    },
    [swiping, advance]
  );

  const stackRotations = [0, 3, -2.5, 4];

  return (
    <div className="md:hidden">
      <div
        className="relative h-[340px] mx-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => !swiping && advance(-1)}
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
                  ? `translateX(${swiping ? swipeX : 0}px) rotate(${swiping ? (swipeX < 0 ? -12 : 12) : 0}deg)`
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

function DesktopTeamSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const selectMember = (i: number) => {
    if (i === activeIndex) return;
    setVisible(false);
    setTimeout(() => { setActiveIndex(i); setVisible(true); }, 300);
  };

  const member = team[activeIndex];

  return (
    <div className="hidden md:flex reveal" style={{ gap: 0 }}>
      {/* Left: featured card (65%) */}
      <div
        className="flex-[0_0_65%] bg-cream border border-anthracite/[0.06] rounded-sm p-12 relative overflow-hidden"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <span className="absolute top-4 right-6 font-syne font-800 text-[8rem] leading-none text-anthracite/[0.025] select-none">
          {member.name[0]}
        </span>
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-anthracite/[0.06] border border-anthracite/[0.08] flex items-center justify-center mb-8">
            <span className="font-syne font-800 text-2xl text-anthracite/20">
              {member.name[0]}{member.surname ? member.surname[0] : ""}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-syne font-800 text-2xl text-anthracite">
              {member.name}
              {member.surname && (
                <span className="font-400 text-anthracite/40 ml-2">{member.surname}</span>
              )}
            </h3>
          </div>
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-terracotta mb-5">
            {member.role}
          </p>
          <p className="text-anthracite/45 text-[1rem] leading-relaxed mb-3">
            {member.description}
          </p>
          <p className="text-anthracite/70 text-[1rem] leading-relaxed font-medium italic">
            {member.accent}
          </p>
        </div>
      </div>

      {/* Right: numbered list (35%) */}
      <div className="flex-[0_0_35%] border border-anthracite/[0.06] border-l-0 rounded-sm rounded-l-none flex flex-col justify-center px-10">
        {team.map((m, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => selectMember(i)}
              className={`flex items-center gap-4 py-5 text-left transition-all duration-300 border-l-2 pl-5 ${
                isActive
                  ? "border-terracotta"
                  : "border-transparent opacity-30 hover:opacity-60"
              }`}
            >
              <span className={`font-syne font-800 text-sm ${isActive ? "text-terracotta" : "text-anthracite"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-syne font-700 text-lg text-anthracite">
                {m.name}
              </span>
            </button>
          );
        })}
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

        {/* Desktop: spotlight layout */}
        <DesktopTeamSpotlight />
      </div>
    </section>
  );
}
