import { type ServiceKey } from "@/lib/data/services";

type Props = {
  active: ServiceKey;
  onSelect: (service: ServiceKey) => void;
};

function Hotspot({
  service,
  active,
  onSelect,
  children,
}: {
  service: ServiceKey;
  active: ServiceKey;
  onSelect: (s: ServiceKey) => void;
  children: React.ReactNode;
}) {
  const isActive = active === service;
  return (
    <g
      className="cursor-wrench"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(service);
      }}
    >
      <style>{`
        .hs-${service} .zone-fill {
          fill: rgba(196,98,45,0.06);
          stroke: rgba(196,98,45,0.2);
          stroke-width: 1;
          stroke-dasharray: 4 3;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .hs-${service}:hover .zone-fill,
        .hs-${service}.active .zone-fill {
          fill: rgba(196,98,45,0.10);
          stroke: #C4622D;
          stroke-width: 1.5;
          stroke-dasharray: none;
        }
        .hs-${service} .part-line {
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .hs-${service}:hover .part-line,
        .hs-${service}.active .part-line {
          stroke: #C4622D !important;
          opacity: 1 !important;
        }
        .hs-${service}:hover .marker-ring,
        .hs-${service}.active .marker-ring {
          opacity: 1;
          stroke-width: 2;
        }
        .hs-${service}:hover .marker-dot,
        .hs-${service}.active .marker-dot {
          opacity: 1;
          r: 4;
        }
      `}</style>
      <g className={`hs-${service}${isActive ? " active" : ""}`}>{children}</g>
    </g>
  );
}

function Marker({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <g className="pointer-events-none">
      <circle cx={cx} cy={cy} r="8" fill="none" stroke="#C4622D" strokeWidth="1" opacity="0"
        className="animate-[zonePulse_3s_ease-out_infinite]" style={{ animationDelay: `${delay}s` }} />
      <circle cx={cx} cy={cy} r="8" fill="none" stroke="#C4622D" strokeWidth="1.5" opacity="0.5"
        className="marker-ring transition-all duration-400" />
      <circle cx={cx} cy={cy} r="3" fill="#C4622D" opacity="0.7"
        className="marker-dot transition-all duration-400" />
    </g>
  );
}

export default function BikeInteractiveSvg({ active, onSelect }: Props) {
  return (
    <svg viewBox="0 0 600 380" fill="none" className="w-full h-auto block relative z-[1]">
      <style>{`
        @keyframes zonePulse {
          0% { r: 8; opacity: 0.5; }
          100% { r: 22; opacity: 0; }
        }
      `}</style>

      {/* Decorative: spokes, hubs, inner rims */}
      <g className="pointer-events-none" opacity="0.12">
        {/* Spokes rear */}
        <line x1="148" y1="193" x2="148" y2="208" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="148" y1="308" x2="148" y2="323" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="83" y1="258" x2="98" y2="258" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="198" y1="258" x2="213" y2="258" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="102" y1="212" x2="110" y2="220" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="186" y1="296" x2="194" y2="304" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="102" y1="304" x2="110" y2="296" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="186" y1="212" x2="194" y2="220" stroke="#1C1C1E" strokeWidth="0.5" />
        {/* Spokes front */}
        <line x1="452" y1="193" x2="452" y2="208" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="452" y1="308" x2="452" y2="323" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="387" y1="258" x2="402" y2="258" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="502" y1="258" x2="517" y2="258" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="406" y1="212" x2="414" y2="220" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="490" y1="296" x2="498" y2="304" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="406" y1="304" x2="414" y2="296" stroke="#1C1C1E" strokeWidth="0.5" />
        <line x1="490" y1="212" x2="498" y2="220" stroke="#1C1C1E" strokeWidth="0.5" />
        {/* Inner rims */}
        <circle cx="148" cy="258" r="58" stroke="#1C1C1E" strokeWidth="0.5" />
        <circle cx="452" cy="258" r="58" stroke="#1C1C1E" strokeWidth="0.5" />
        {/* Hubs */}
        <circle cx="148" cy="258" r="6" fill="#1C1C1E" opacity="0.4" />
        <circle cx="452" cy="258" r="6" fill="#1C1C1E" opacity="0.4" />
      </g>

      {/* ── Révision = the frame (bottom layer) ── */}
      <Hotspot service="revision" active={active} onSelect={onSelect}>
        {/* Hit areas (invisible thick strokes) */}
        <line x1="235" y1="140" x2="415" y2="140" stroke="transparent" strokeWidth="20" className="fill-transparent pointer-events-auto" />
        <line x1="248" y1="148" x2="152" y2="248" stroke="transparent" strokeWidth="20" className="fill-transparent pointer-events-auto" />
        <line x1="235" y1="140" x2="200" y2="252" stroke="transparent" strokeWidth="20" className="fill-transparent pointer-events-auto" />
        <line x1="200" y1="252" x2="148" y2="258" stroke="transparent" strokeWidth="18" className="fill-transparent pointer-events-auto" />
        <line x1="235" y1="140" x2="148" y2="258" stroke="transparent" strokeWidth="18" className="fill-transparent pointer-events-auto" />
        <line x1="415" y1="140" x2="452" y2="258" stroke="transparent" strokeWidth="20" className="fill-transparent pointer-events-auto" />
        <ellipse cx="235" cy="107" rx="28" ry="14" className="fill-transparent pointer-events-auto" />
        <path d="M 395 100 Q 418 88 445 100 L 445 118 L 395 118 Z" className="fill-transparent pointer-events-auto" />

        {/* Visible frame tubes */}
        <line className="part-line" x1="235" y1="140" x2="415" y2="140" stroke="#1C1C1E" strokeWidth="3" opacity="0.25" />
        <line className="part-line" x1="248" y1="148" x2="152" y2="248" stroke="#1C1C1E" strokeWidth="3" opacity="0.25" />
        <line className="part-line" x1="235" y1="140" x2="200" y2="252" stroke="#1C1C1E" strokeWidth="3" opacity="0.25" />
        <line className="part-line" x1="200" y1="252" x2="148" y2="258" stroke="#1C1C1E" strokeWidth="2.5" opacity="0.2" />
        <line className="part-line" x1="235" y1="140" x2="148" y2="258" stroke="#1C1C1E" strokeWidth="1.8" opacity="0.18" />
        <line className="part-line" x1="415" y1="140" x2="452" y2="258" stroke="#1C1C1E" strokeWidth="3" opacity="0.25" />
        <line className="part-line" x1="415" y1="140" x2="418" y2="115" stroke="#1C1C1E" strokeWidth="2.5" opacity="0.22" />
        <path className="part-line" d="M 400 108 Q 418 98 440 106" stroke="#1C1C1E" strokeWidth="2.5" fill="none" opacity="0.22" />
        <line className="part-line" x1="235" y1="140" x2="235" y2="112" stroke="#1C1C1E" strokeWidth="2.5" opacity="0.22" />
        <ellipse className="part-line" cx="235" cy="107" rx="22" ry="6" stroke="#1C1C1E" strokeWidth="2" fill="none" opacity="0.2" />

        <Marker cx={325} cy={140} delay={0.5} />
      </Hotspot>

      {/* ── Roues & Pneus ── */}
      <Hotspot service="roues" active={active} onSelect={onSelect}>
        <circle className="zone-fill" cx="148" cy="258" r="72" />
        <circle className="zone-fill" cx="452" cy="258" r="72" />
        <circle cx="148" cy="258" r="76" className="fill-transparent pointer-events-auto" />
        <circle cx="452" cy="258" r="76" className="fill-transparent pointer-events-auto" />
        <circle className="part-line" cx="148" cy="258" r="72" stroke="#1C1C1E" strokeWidth="2" fill="none" opacity="0.55" />
        <circle className="part-line" cx="452" cy="258" r="72" stroke="#1C1C1E" strokeWidth="2" fill="none" opacity="0.55" />
        <Marker cx={148} cy={186} delay={0.2} />
        <Marker cx={452} cy={186} delay={1.2} />
      </Hotspot>

      {/* ── Freinage ── */}
      <Hotspot service="freinage" active={active} onSelect={onSelect}>
        <rect className="zone-fill" x="430" y="170" width="46" height="34" rx="8" />
        <rect className="zone-fill" x="124" y="170" width="46" height="34" rx="8" />
        <rect x="426" y="165" width="54" height="44" rx="10" className="fill-transparent pointer-events-auto" />
        <rect x="120" y="165" width="54" height="44" rx="10" className="fill-transparent pointer-events-auto" />
        <rect className="part-line" x="439" y="178" width="7" height="18" rx="2" stroke="#1C1C1E" strokeWidth="1.8" fill="none" opacity="0.65" />
        <rect className="part-line" x="459" y="178" width="7" height="18" rx="2" stroke="#1C1C1E" strokeWidth="1.8" fill="none" opacity="0.65" />
        <rect className="part-line" x="133" y="178" width="7" height="18" rx="2" stroke="#1C1C1E" strokeWidth="1.8" fill="none" opacity="0.65" />
        <rect className="part-line" x="153" y="178" width="7" height="18" rx="2" stroke="#1C1C1E" strokeWidth="1.8" fill="none" opacity="0.65" />
        <path className="part-line" d="M 435 120 Q 440 148 442 175" stroke="#1C1C1E" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="3,2" />
        <path className="part-line" d="M 236 130 Q 180 140 155 175" stroke="#1C1C1E" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="3,2" />
        <Marker cx={453} cy={176} delay={0.8} />
      </Hotspot>

      {/* ── Transmission ── */}
      <Hotspot service="transmission" active={active} onSelect={onSelect}>
        <ellipse className="zone-fill" cx="186" cy="260" rx="52" ry="38" />
        <ellipse cx="186" cy="260" rx="56" ry="42" className="fill-transparent pointer-events-auto" />
        <circle className="part-line" cx="200" cy="255" r="24" stroke="#1C1C1E" strokeWidth="2" fill="none" opacity="0.55" />
        <circle className="part-line" cx="200" cy="255" r="17" stroke="#1C1C1E" strokeWidth="1" fill="none" opacity="0.3" />
        <circle className="part-line" cx="148" cy="258" r="14" stroke="#1C1C1E" strokeWidth="1.5" fill="none" opacity="0.45" />
        <line className="part-line" x1="200" y1="272" x2="148" y2="272" stroke="#1C1C1E" strokeWidth="1.8" opacity="0.45" />
        <line className="part-line" x1="200" y1="238" x2="148" y2="244" stroke="#1C1C1E" strokeWidth="1.8" opacity="0.45" />
        <line className="part-line" x1="178" y1="254" x2="168" y2="270" stroke="#1C1C1E" strokeWidth="2.5" opacity="0.45" />
        <line className="part-line" x1="222" y1="256" x2="232" y2="240" stroke="#1C1C1E" strokeWidth="2.5" opacity="0.45" />
        <path className="part-line" d="M 152 274 L 158 288 L 146 293" stroke="#1C1C1E" strokeWidth="1.5" fill="none" opacity="0.45" />
        <Marker cx={200} cy={228} delay={1.6} />
      </Hotspot>

      {/* ── Électrique ── */}
      <Hotspot service="electrique" active={active} onSelect={onSelect}>
        <rect className="zone-fill" x="170" y="148" width="68" height="28" rx="6" transform="rotate(-40, 204, 162)" />
        <rect x="165" y="142" width="78" height="40" rx="8" transform="rotate(-40, 204, 162)" className="fill-transparent pointer-events-auto" />
        <rect className="part-line" x="178" y="155" width="52" height="16" rx="4" stroke="#1C1C1E" strokeWidth="1.8" fill="rgba(196,98,45,0.05)" opacity="0.7" transform="rotate(-40, 204, 163)" />
        <path className="part-line" d="M 196 170 L 202 160 L 198 165 L 205 155" stroke="#C4622D" strokeWidth="1.5" fill="none" opacity="0.55" />
        <Marker cx={186} cy={150} delay={2} />
      </Hotspot>

      {/* ── Urgences ── */}
      <Hotspot service="urgences" active={active} onSelect={onSelect}>
        <circle className="zone-fill" cx="545" cy="70" r="26" />
        <circle cx="545" cy="70" r="30" className="fill-transparent pointer-events-auto" />
        <circle className="part-line" cx="545" cy="70" r="22" stroke="#1C1C1E" strokeWidth="1.2" fill="#FAFAF7" opacity="0.9" />
        <text x="545" y="67" textAnchor="middle" fontFamily="Syne, sans-serif" fontSize="11" fontWeight="700" fill="#1C1C1E" opacity="0.6" className="pointer-events-none">SOS</text>
        <text x="545" y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#1C1C1E" opacity="0.35" className="pointer-events-none">urgences</text>
        <circle cx="545" cy="70" r="8" fill="none" stroke="#C4622D" strokeWidth="1" opacity="0"
          className="pointer-events-none animate-[zonePulse_3s_ease-out_infinite]" style={{ animationDelay: "2.4s" }} />
      </Hotspot>
    </svg>
  );
}
