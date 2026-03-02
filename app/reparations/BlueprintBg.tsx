"use client";

import { useId } from "react";

export default function BlueprintBg({ variant }: { variant?: "full" }) {
  const uid = useId().replace(/:/g, "");
  const isFull = variant === "full";

  return (
    <div
      className={
        isFull
          ? "w-full h-full min-h-full"
          : "absolute -inset-x-20 -inset-y-15 z-0 pointer-events-none opacity-[0.22]"
      }
      style={isFull ? { position: "absolute", inset: 0 } : { filter: "blur(0.2px)" }}
    >
      <svg
        viewBox="0 0 800 520"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio={isFull ? "xMidYMid slice" : undefined}
        style={isFull ? { width: "100%", height: "100%", minHeight: "100%" } : undefined}
      >
        <defs>
          <pattern id={`gs-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#1C1C1E" strokeWidth="0.3" />
            <line x1="0" y1="0" x2="20" y2="0" stroke="#1C1C1E" strokeWidth="0.3" />
          </pattern>
          <pattern id={`gl-${uid}`} width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill={`url(#gs-${uid})`} />
            <line x1="0" y1="0" x2="0" y2="100" stroke="#1C1C1E" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="100" y2="0" stroke="#1C1C1E" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="800" height="520" fill={`url(#gl-${uid})`} opacity="0.7" />

        <circle cx="380" cy="260" r="200" stroke="#1C1C1E" strokeWidth="0.6" opacity="0.5" />
        <circle cx="380" cy="260" r="160" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" strokeDasharray="6 4" />
        <rect x="165" y="80" width="430" height="360" stroke="#1C1C1E" strokeWidth="0.5" opacity="0.35" />

        <line x1="380" y1="30" x2="380" y2="490" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" strokeDasharray="8 6" />
        <line x1="80" y1="260" x2="680" y2="260" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" strokeDasharray="8 6" />

        <line x1="165" y1="80" x2="595" y2="440" stroke="#1C1C1E" strokeWidth="0.3" opacity="0.15" />
        <line x1="595" y1="80" x2="165" y2="440" stroke="#1C1C1E" strokeWidth="0.3" opacity="0.15" />

        <path d="M 180 440 A 250 250 0 0 1 380 60" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.2" strokeDasharray="4 6" />
        <path d="M 580 440 A 250 250 0 0 0 380 60" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.2" strokeDasharray="4 6" />

        <circle cx="380" cy="260" r="3" stroke="#1C1C1E" strokeWidth="0.5" opacity="0.4" />
        <circle cx="380" cy="260" r="1" fill="#1C1C1E" opacity="0.3" />
        <circle cx="380" cy="80" r="2" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" />
        <circle cx="380" cy="440" r="2" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" />
        <circle cx="165" cy="260" r="2" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" />
        <circle cx="595" cy="260" r="2" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" />

        <line x1="120" y1="470" x2="660" y2="470" stroke="#1C1C1E" strokeWidth="0.5" opacity="0.3" />
        <line x1="120" y1="465" x2="120" y2="475" stroke="#1C1C1E" strokeWidth="0.5" opacity="0.3" />
        <line x1="660" y1="465" x2="660" y2="475" stroke="#1C1C1E" strokeWidth="0.5" opacity="0.3" />
        <line x1="120" y1="468" x2="126" y2="472" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" />
        <line x1="660" y1="468" x2="654" y2="472" stroke="#1C1C1E" strokeWidth="0.4" opacity="0.3" />
        <line x1="700" y1="100" x2="700" y2="420" stroke="#1C1C1E" strokeWidth="0.5" opacity="0.3" />
        <line x1="695" y1="100" x2="705" y2="100" stroke="#1C1C1E" strokeWidth="0.5" opacity="0.3" />
        <line x1="695" y1="420" x2="705" y2="420" stroke="#1C1C1E" strokeWidth="0.5" opacity="0.3" />

        <path d="M 380 260 L 410 240" stroke="#1C1C1E" strokeWidth="0.3" opacity="0.25" />
        <path d="M 395 252 A 18 18 0 0 0 405 245" stroke="#1C1C1E" strokeWidth="0.3" fill="none" opacity="0.2" />

        <path d="M 380 260 C 380 200, 440 160, 480 200 C 520 240, 500 300, 450 310 C 400 320, 380 290, 390 270 C 400 250, 415 258, 408 268"
          stroke="#1C1C1E" strokeWidth="0.4" fill="none" opacity="0.15" />

        <text x="130" y="475" fontFamily="Inter, sans-serif" fontSize="5" fill="#1C1C1E" opacity="0.25" letterSpacing="0.1em">1080mm</text>
        <text x="693" y="265" fontFamily="Inter, sans-serif" fontSize="5" fill="#1C1C1E" opacity="0.25" letterSpacing="0.1em" transform="rotate(-90, 693, 265)">640mm</text>
        <text x="355" y="50" fontFamily="Inter, sans-serif" fontSize="4.5" fill="#1C1C1E" opacity="0.2" letterSpacing="0.15em">AXE CENTRAL</text>

        <g opacity="0.25">
          {[[100, 55], [700, 55], [100, 465], [700, 465]].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} stroke="#1C1C1E" strokeWidth="0.4" />
              <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} stroke="#1C1C1E" strokeWidth="0.4" />
              <circle cx={cx} cy={cy} r="4" stroke="#1C1C1E" strokeWidth="0.3" fill="none" />
            </g>
          ))}
        </g>

        <g opacity="0.12">
          <line x1="380" y1="260" x2="540" y2="160" stroke="#1C1C1E" strokeWidth="0.3" />
          <line x1="380" y1="260" x2="540" y2="360" stroke="#1C1C1E" strokeWidth="0.3" />
          <line x1="380" y1="260" x2="220" y2="160" stroke="#1C1C1E" strokeWidth="0.3" />
          <line x1="380" y1="260" x2="220" y2="360" stroke="#1C1C1E" strokeWidth="0.3" />
        </g>
      </svg>
    </div>
  );
}
