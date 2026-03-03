"use client";

import { useState, useRef, useCallback } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useReveal } from "@/components/ui/useReveal";

const reviews = [
  {
    name: "Sophie M.",
    text: "Accueil chaleureux et conseils personnalisés. David a pris le temps de m'expliquer chaque option. Mon vélo électrique fonctionne parfaitement.",
  },
  {
    name: "Laurent D.",
    text: "Ils m'ont dit que mon vélo n'avait pas besoin de révision complète. Ça change des garages qui facturent sans regarder. Je reviendrai.",
  },
  {
    name: "Nadia K.",
    text: "Réparation de mon VAE BOSCH en 24h. Mathys a trouvé le problème tout de suite. Tarif juste, travail propre. Le meilleur atelier du coin.",
  },
  {
    name: "Thomas B.",
    text: "François m'a aidé à choisir le bon modèle Orbea pour mes trajets quotidiens. 1ère révision offerte, c'est un vrai plus.",
  },
  {
    name: "Camille R.",
    text: "Mon fils avait besoin d'un vélo pour ses 8 ans. Christophe a tout réglé aux petits oignons. On sent la passion du métier.",
  },
  {
    name: "Marc P.",
    text: "Honnêtes et compétents. Ils m'ont expliqué exactement ce qui n'allait pas et combien ça coûterait avant de commencer. Rare de nos jours.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function MobileReviewStack() {
  const [active, setActive] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const [swipeDir, setSwipeDir] = useState<1 | -1>(-1);
  const touchRef = useRef({ startX: 0, startY: 0 });

  const next = useCallback(() => {
    setSwiping(true);
    setSwipeDir(-1);
    setSwipeX(-400);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % reviews.length);
      setSwipeX(0);
      setSwiping(false);
    }, 350);
  }, []);

  const prev = useCallback(() => {
    setSwiping(true);
    setSwipeDir(1);
    setSwipeX(400);
    setTimeout(() => {
      setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
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
        if (dx < 0) next();
        else prev();
      }
    },
    [swiping, next, prev]
  );

  const stackRotations = [0, 3, -2.5, 4, -3, 2.5];

  return (
    <div className="md:hidden">
      <div
        className="relative h-[260px] mx-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => !swiping && next()}
      >
        {reviews.map((review, i) => {
          const offset = (i - active + reviews.length) % reviews.length;
          const isTop = offset === 0;
          const rot = stackRotations[offset] ?? 0;

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: isTop
                  ? `translateX(${swiping ? swipeX : 0}px) rotate(${swiping ? swipeDir * 12 : 0}deg)`
                  : `translateY(${offset * 14}px) rotate(${rot}deg) scale(${1 - offset * 0.03})`,
                opacity: offset > 2 ? 0 : 1,
                zIndex: reviews.length - offset,
                transition: swiping
                  ? "transform 350ms ease-out, opacity 350ms ease-out"
                  : "transform 400ms ease, opacity 400ms ease",
                pointerEvents: isTop ? "auto" : "none",
              }}
            >
              <div
                className={`border border-white/[0.08] rounded-2xl p-7 h-full ${isTop ? "bg-white/[0.06] shadow-lg shadow-black/20" : "bg-white/[0.03] shadow-md shadow-black/10"}`}
              >
                <Stars />
                <p className="mt-5 text-white/50 text-[0.9rem] leading-[1.8]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <span className="text-[0.6rem] font-bold text-white/30">
                      {review.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <span className="text-white/30 text-sm font-medium">{review.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-terracotta w-6" : "bg-white/20"
              }`}
              aria-label={`Avis ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-[0.7rem] text-white/30 font-medium ml-1">
          {active + 1}/{reviews.length}
        </span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const ref = useReveal(0.08);

  return (
    <section ref={ref} id="avis" className="bg-anthracite py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="reveal grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16 md:mb-24">
          <div>
            <SectionTitle tag="Avis clients" light>
              <>
                Ce que disent ceux
                <br />
                qui <span className="text-terracotta">roulent avec nous.</span>
              </>
            </SectionTitle>
          </div>

          {/* Big rating */}
          <div className="flex items-center gap-6">
            <span className="font-syne font-800 text-[5rem] md:text-[6rem] leading-none text-white">
              4,8
            </span>
            <div>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/30 text-sm">271 avis Google</p>
              <p className="text-white/15 text-xs mt-1">On ne les a pas écrits nous-mêmes.</p>
            </div>
          </div>
        </div>

        {/* Reviews carousel */}
        <div className="reveal">
          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((review, i) => (
              <div
                key={i}
                className={`reveal stagger-${i + 1} border border-white/[0.06] rounded-sm p-7 hover:border-terracotta/20 transition-all duration-500`}
              >
                <Stars />
                <p className="mt-5 text-white/50 text-[0.9rem] leading-[1.8]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <span className="text-[0.6rem] font-bold text-white/30">
                      {review.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <span className="text-white/30 text-sm font-medium">{review.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: swipeable card stack */}
          <MobileReviewStack />

          {/* Second row desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 mt-5">
            {reviews.slice(3, 6).map((review, i) => (
              <div
                key={i}
                className={`reveal stagger-${i + 3} border border-white/[0.06] rounded-sm p-7 hover:border-terracotta/20 transition-all duration-500`}
              >
                <Stars />
                <p className="mt-5 text-white/50 text-[0.9rem] leading-[1.8]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <span className="text-[0.6rem] font-bold text-white/30">
                      {review.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <span className="text-white/30 text-sm font-medium">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
