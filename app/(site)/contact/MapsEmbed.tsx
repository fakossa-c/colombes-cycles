"use client";

import { useState } from "react";

export default function MapsEmbed() {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer group"
      onClick={() => setActive(true)}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.0!2d2.2442!3d48.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e665c1e6d7e8a7%3A0x0!2s12+Avenue+Henri+Barbusse%2C+92700+Colombes!5e0!3m2!1sfr!2sfr!4v1700000000000"
        width="100%"
        height="100%"
        style={{ border: 0, pointerEvents: active ? "auto" : "none" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Colombes Cycles — 12 Av. Henri Barbusse, 92700 Colombes"
      />
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center bg-anthracite/[0.03] group-hover:bg-anthracite/[0.06] transition-colors duration-300">
          <span className="text-[0.75rem] font-medium text-anthracite/40 bg-white/80 px-3 py-1.5 rounded-full">
            Cliquer pour activer la carte
          </span>
        </div>
      )}
    </div>
  );
}
