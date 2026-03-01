"use client";

import { useEffect, useRef } from "react";

/**
 * Applies parallax to child elements with data-speed attribute.
 * data-speed="0.05" = slow, data-speed="0.15" = fast
 * Negative values = moves in opposite direction
 */
export function useParallax() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const children = el.querySelectorAll<HTMLElement>("[data-speed]");

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const viewCenter = window.innerHeight / 2;
          const offset = center - viewCenter;

          children.forEach((child) => {
            const speed = parseFloat(child.dataset.speed || "0");
            child.style.transform = `translateY(${offset * speed}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return ref;
}
