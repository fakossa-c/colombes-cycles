"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useReveal } from "@/components/ui/useReveal";
import { reviews } from "@/lib/data/reviews";

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
  const touchRef = useRef({ startX: 0, startY: 0 });

  const advance = useCallback((dir: -1 | 1) => {
    setSwiping(true);
    setSwipeX(dir * 400);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % reviews.length);
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

  const stackRotations = [0, 3, -2.5, 4, -3, 2.5];

  return (
    <div className="md:hidden">
      <div
        className="relative h-[260px] mx-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => !swiping && advance(-1)}
      >
        {reviews.map((review, i) => {
          const offset = (i - active + reviews.length) % reviews.length;
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
                zIndex: reviews.length - offset,
                transition: hidden
                  ? "none"
                  : swiping
                    ? "transform 350ms ease-out, opacity 350ms ease-out"
                    : "transform 400ms ease, opacity 400ms ease",
                pointerEvents: isTop ? "auto" : "none",
              }}
            >
              <div
                className={`border border-white/[0.08] rounded-2xl p-7 h-full ${isTop ? "bg-[#2a2a2c] shadow-lg shadow-black/20" : "bg-[#242426] shadow-md shadow-black/10"}`}
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

function DesktopReviewTheater() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => {
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 300);
  }, []);

  const next = useCallback(() => go((active + 1) % reviews.length), [active, go]);
  const prev = useCallback(() => go((active - 1 + reviews.length) % reviews.length), [active, go]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const review = reviews[active];

  return (
    <div
      className="hidden md:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-8 max-w-4xl mx-auto">
        {/* Prev arrow */}
        <button
          onClick={prev}
          className="flex-none w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors duration-300"
          aria-label="Avis précédent"
        >
          <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Quote stage */}
        <div
          className="flex-1 text-center py-10"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <div className="font-syne font-800 text-[7rem] leading-none text-terracotta/60 mb-2 select-none" aria-hidden="true">
            &ldquo;
          </div>
          <p className="text-white/70 text-[1.15rem] leading-[1.8] max-w-2xl mx-auto mb-8">
            {review.text}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center">
              <span className="text-[0.6rem] font-bold text-white/30">
                {review.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <span className="text-white/40 text-sm font-medium">{review.name}</span>
          </div>
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          className="flex-none w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors duration-300"
          aria-label="Avis suivant"
        >
          <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "w-6 h-2 bg-terracotta" : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Avis ${i + 1}`}
          />
        ))}
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
          {/* Desktop: quote theater */}
          <DesktopReviewTheater />

          {/* Mobile: swipeable card stack */}
          <MobileReviewStack />
        </div>
      </div>
    </section>
  );
}
