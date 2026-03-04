import { trustItems } from "@/lib/data/trust-items";

export default function TrustBand() {
  // Duplicate for seamless loop
  const track = [...trustItems, ...trustItems];

  return (
    <section className="bg-anthracite border-t border-white/[0.06] overflow-hidden py-5">
      <div className="marquee-track flex items-center whitespace-nowrap">
        {track.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-[0.75rem] md:text-sm font-medium tracking-[0.1em] uppercase text-white/50 px-6 md:px-10">
              {item}
            </span>
            <span className="text-terracotta text-lg">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
